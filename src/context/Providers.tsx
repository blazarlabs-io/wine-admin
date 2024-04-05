import { AppStateProvider } from "./appStateContext";
import { AuthProvider } from "./authContext";
import { SideBarProvider } from "./sideBarContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppStateProvider>
      <SideBarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SideBarProvider>
    </AppStateProvider>
  );
};
