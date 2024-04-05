import { AppStateProvider } from "./appStateContext";
import { AuthProvider } from "./authContext";
import { ModalProvider } from "./modalContext";
import { SideBarProvider } from "./sideBarContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppStateProvider>
      <ModalProvider>
        <SideBarProvider>
          <AuthProvider>{children}</AuthProvider>
        </SideBarProvider>
      </ModalProvider>
    </AppStateProvider>
  );
};
