import {
  TopBar,
  SideBar,
  Container,
  // Toast,
  // Modal,
  AuthSpinnerLoader,
  GeneralLoaderOverlay,
} from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-full">
      <GeneralLoaderOverlay />
      <AuthSpinnerLoader />

      {/* <Modal />
      <Toast /> */}
      <TopBar />
      <div className="flex items-start w-full h-full">
        <SideBar />
        <div className="w-full h-full">{children}</div>
      </div>
    </main>
  );
};
