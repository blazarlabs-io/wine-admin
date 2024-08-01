import { Toaster, TopbarFull, SideBar } from "@/components";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto h-screen w-[100vw]">
      <Toaster />
      <TopbarFull />
      <div className="flex items-start w-full h-full">
        <SideBar />
        <div className="relative w-full h-full">{children}</div>
      </div>
    </main>
  );
};
