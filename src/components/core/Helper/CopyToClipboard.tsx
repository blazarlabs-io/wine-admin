"use client";
import { Button, Container, Text } from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "@/context/toastContext";

export const CopyToClipboard = ({ text }: { text: string }) => {
  const { updateToast } = useToast();

  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      updateToast({
        show: true,
        status: "success",
        message: "Copied to clipboard",
        timeout: 2000,
      });
    }
  }, [show]);

  return (
    <Container intent="flexRowCenter" gap="xsmall">
      <Button
        intent="text"
        onClick={copyToClipboard}
        className="cursor-pointer"
      >
        <Icon icon="carbon:copy" width="16" height="16" />
      </Button>
    </Container>
  );
};
