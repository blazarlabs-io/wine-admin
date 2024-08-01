import { AppStateProvider } from "./appStateContext";
import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";
import { RealTimeDbProvider } from "./realTimeDbContext";
import { SideBarProvider } from "./sideBarContext";
import { ToastProvider } from "./toastContext";
import { WineClientProvider } from "./wineClientSdkContext";
import { ThemeProvider } from "./ThemeProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WineClientProvider>
      <RealTimeDbProvider>
        <AppStateProvider>
          <ModalProvider>
            <ToastProvider>
              <SideBarProvider>
                <AuthProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                  </ThemeProvider>
                </AuthProvider>
              </SideBarProvider>
            </ToastProvider>
          </ModalProvider>
        </AppStateProvider>
      </RealTimeDbProvider>
    </WineClientProvider>
  );
};
