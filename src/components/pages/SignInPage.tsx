import { Login, Container } from "@/components";

export const SignInPage = () => {
  return (
    <Container intent="flexRowCenter" className="w-full h-full">
      <Login
        title="Sign In"
        description="Sign in with your administrator credentials."
      />
    </Container>
  );
};
