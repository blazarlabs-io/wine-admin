import { getDynamicQrCodes } from "@/utils/firestoreUtils";
import { useEffect, useState } from "react";

export const useDynamicQrCode = (id: string) => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const getQrCodes = async () => {
    const codes = await getDynamicQrCodes();
    const result = codes.filter((code) => code.docId === id);
    console.log(result, id);
    if (result.length > 0) {
      setRedirectUrl(result[0].redirectUrl);
    }
  };

  useEffect(() => {
    getQrCodes();
  }, [id]);

  return { redirectUrl };
};
