import { PageLayout, QrCodeGenerator, QrCodeViewer, Text } from "@/components";

export const QrCodesPage = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h4">Qr Codes</Text>
      </div>
      <div className="flex flex-col w-full items-start justify-start gap-[8px]">
        <Text intent="h6">Available Qr Codes</Text>
        <QrCodeViewer />
      </div>
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h6">Generate new Qr Code</Text>
      </div>
      <QrCodeGenerator />
    </PageLayout>
  );
};
