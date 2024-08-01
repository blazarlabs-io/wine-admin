import { TopbarClean } from "@/components/ui/molecules/topbar-clean";
import { Toaster } from "@/components/ui/core/toast/toaster";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export const CleanLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className="relative flex flex-col justify-start items-center mx-auto h-screen w-full">
      <Toaster />
      <TopbarClean />
      {children}
    </main>
  );
};
