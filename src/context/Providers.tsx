import { AppStateProvider } from "./appStateContext";
import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";
import { RealTimeDbProvider } from "./realTimeDbContext";
import { SideBarProvider } from "./sideBarContext";
import { ToastProvider } from "./toastContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <RealTimeDbProvider>
      <AppStateProvider>
        <ModalProvider>
          <ToastProvider>
            <SideBarProvider>
              <AuthProvider>{children}</AuthProvider>
            </SideBarProvider>
          </ToastProvider>
        </ModalProvider>
      </AppStateProvider>
    </RealTimeDbProvider>
  );
};
