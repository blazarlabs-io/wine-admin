import { Button, Container, Text } from "@/components";

export interface CreateNewUserCardProps {
  onClick: () => void;
}

export const CreateNewUserCard = ({ onClick }: CreateNewUserCardProps) => {
  return (
    <Container
      intent="flexColLeft"
      px="medium"
      py="medium"
      gap="medium"
      className="bg-surface-light max-w-fit rounded-lg"
    >
      <Container intent="flexColLeft" gap="small">
        <Text intent="h4" className="">
          Create New User
        </Text>
        <Text intent="body" className="mt-small">
          Create a new winery user for a customer / client.
        </Text>
      </Container>
      <Button
        onClick={onClick}
        intent="primary"
        size="medium"
        className="mt-small"
      >
        Create New User
      </Button>
    </Container>
  );
};
