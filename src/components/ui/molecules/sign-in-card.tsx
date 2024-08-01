"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useLocalStorage } from "usehooks-ts";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";
import { ToastProps } from "@/typings/components";
import { useToast } from "@/components/ui/core/toast/use-toast";
import { useWineClient } from "@/context/wineClientSdkContext";

//
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Button } from "@/components/ui/core/button";
import { Input } from "@/components/ui/core/input";
import { Label } from "@/components/ui/core/label";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

export interface SignInCardProps {
  title: string;
  description: string;
}

export const SignInCard = ({ title, description }: SignInCardProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const { updateAuthLoading, authLoading } = useAuth();
  const { toast } = useToast();
  const { updateAppLoading } = useAppState();
  const { wineClient } = useWineClient();

  const [email, setEmail] = useLocalStorage(
    "email",
    { address: "" },
    {
      initializeWithValue: false,
    }
  );
  const [password, setPassword] = useLocalStorage(
    "password",
    { value: "" },
    {
      initializeWithValue: false,
    }
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    !user && updateAppLoading(false);
  }, []);

  const toastProps: ToastProps = {
    show: false,
    status: null,
    message: null,
    timeout: null,
  };

  const handleSignIn = async () => {
    updateAuthLoading(true);

    wineClient.auth
      .isUserAdmin(email.address)
      .then((result: any) => {
        if (result.data) {
          signInWithEmailAndPassword(auth, email.address, password.value)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              updateAuthLoading(false);
              updateAppLoading(true);
              router.replace("/home");
              toast({
                title: "Login Success",
                description:
                  "You have successfully logged in as an admin user!",
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast({
                title: "Login Error",
                description:
                  (firebaseAuthErrors[errorCode] as string) ?? errorMessage,
              });
              updateAuthLoading(false);
            });
        } else {
          toast({
            title: "Login Error",
            description: "You are not an admin. user!",
          });
          updateAuthLoading(false);
        }
      })
      .catch((err: any) => {
        toast({
          title: "Login Error",
          description: err.message,
        });
        updateAuthLoading(false);
      });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription className="pt-[8px]">
          Please enter your email and password to login as an admin user.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="my@email.com"
                onChange={(e) => setEmail({ address: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  onChange={(e) => setPassword({ value: e.target.value })}
                />
                <button
                  type="button"
                  className="text-black dark:text-white absolute right-[8px] top-[12px]"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSignIn} className="">
          {!authLoading ? (
            "Login"
          ) : (
            <LoaderCircle size={16} className="animate-spin" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
