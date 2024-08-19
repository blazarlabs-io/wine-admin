"use client";

import { useDynamicQrCode } from "@/hooks/useDynamicQrCode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Text } from "@/components";

export interface PageProps {
  params: {
    slug: string;
  };
}

export default function DynamicQrCodes({ params }: PageProps) {
  const { redirectUrl } = useDynamicQrCode(params.slug);
  const router = useRouter();

  useEffect(() => {
    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  }, [redirectUrl]);

  return (
    <div className="w-full h-screen flex items-center justify-center gap-[8px]">
      <LoaderCircle className="animate-spin" size={32} />
      <Text intent="h6">Loading...</Text>
    </div>
  );
}
