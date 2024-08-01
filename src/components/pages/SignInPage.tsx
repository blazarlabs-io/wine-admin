import { SignInCard } from "../ui/molecules/sign-in-card";

export const SignInPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SignInCard
        title="Sign In"
        description="Sign in with your administrator credentials."
      />
    </div>
  );
};
