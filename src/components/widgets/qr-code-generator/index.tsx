"use client";

import { Button, Input, Label } from "@/components";
import {
  saveDynamicQrCode,
  uploadQrCodeToStorage,
} from "@/utils/firestoreUtils";
import { getQrCodeImageData, fileToBase64 } from "@/utils/qr-code";
import { generateApiKey } from "@/utils/randomKeyGenerator";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useToast } from "@/components";
import { LoaderCircle } from "lucide-react";

export const QrCodeGenerator = () => {
  const { toast } = useToast();

  const [value, setValue] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = () => {
    setLoading(true);
    uploadQrCodeToStorage(
      id as string,
      getQrCodeImageData("dynamic-qr-code"),
      (uploadUrl) => {
        console.log(uploadUrl);
        saveDynamicQrCode({
          docId: id as string,
          staticUrl: value as string,
          redirectUrl: redirectUrl as string,
          imageUrl: uploadUrl,
        })
          .then(() => {
            toast({
              title: "Success",
              description: "QR Code saved successfully",
            });
            setValue(null);
            setId(null);
            setRedirectUrl(null);
            setLoading(false);
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to save QR Code",
              variant: "destructive",
            });
            setLoading(false);
          });
      }
    );
  };

  return (
    <div className="flex items-start justify-start gap-[32px] w-full">
      <div className="flex flex-col items-start justify-start gap-[16px] min-w-fit max-w-fit">
        <div
          style={{
            background: value ? "white" : "",
            padding: "16px",
            border: value ? "none" : "1px solid #222",
            borderRadius: "8px",
          }}
        >
          {value ? (
            <div className="flex flex-col gap-[16px] max-w-[256px]">
              <QRCode
                id="dynamic-qr-code"
                size={1080}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={value}
                qrStyle="squares"
                eyeRadius={0}
              />
            </div>
          ) : (
            <div className="h-[256px] w-[256px] flex items-center justify-center">
              <Icon
                icon="bi:qr-code"
                width={80}
                height={80}
                className="text-muted"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-[16px] w-full">
          <Button
            disabled={value ? true : false}
            variant="secondary"
            onClick={() => {
              const randomId = generateApiKey(16);
              setId(randomId);
              setValue(
                `${process.env.NEXT_PUBLIC_DYNAMIC_QR_CODES_REDIRECT_URL}${randomId}`
              );
            }}
          >
            Generate
          </Button>
        </div>
      </div>
      {value && (
        <div className="flex flex-col gap-[16px] w-full">
          <Label>Static URL</Label>
          <Input value={value} readOnly className="w-full" />
          <Label htmlFor="qrcode-url">Redirect URL</Label>
          <div className="flex items-center justify-start gap-[16px]">
            <Input
              id="qrcode-url"
              name="qrcode-url"
              value={redirectUrl || ""}
              onChange={(e) => {
                setRedirectUrl(e.target.value);
              }}
            />
            <Button
              variant="secondary"
              onClick={handleSave}
              className="flex items-center justify-center"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
