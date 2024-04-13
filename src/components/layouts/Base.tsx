import {
  TopBar,
  SideBar,
  Modal,
  AuthSpinnerLoader,
  GeneralLoaderOverlay,
  Toast,
} from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto max-w-[1440px] h-screen w-[100vw]">
      <GeneralLoaderOverlay />
      <AuthSpinnerLoader />
      <Modal />
      <Toast />
      <TopBar />
      <div className="flex items-start w-full h-full mt-[48px]">
        <SideBar />
        <div className="relative w-full h-full">{children}</div>
      </div>
    </main>
  );
};
