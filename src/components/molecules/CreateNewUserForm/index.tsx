import { Button, Container, DropDown, Text } from "@/components";

export interface CreateNewUserProps {
  onCreate: () => void;
  onCancel: () => void;
}

export const CreateNewUserForm = ({
  onCreate,
  onCancel,
}: CreateNewUserProps) => {
  return (
    <Container
      intent="flexRowCenter"
      className="w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm"
    >
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 max-w-fit min-w-[520px]"
        gap="medium"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Create New User</Text>
          <Text intent="p1" variant="dim">
            Create a new winery user for a customer / client.
          </Text>
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Email
          </Text>
          <input
            type="email"
            required
            value=""
            onChange={(event: any) => {}}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Password
          </Text>
          <input
            type="password"
            required
            value=""
            onChange={(event: any) => {}}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Tier
            </Text>
            <DropDown items={["1", "2"]} fullWidth onSelect={() => {}} />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Level
            </Text>
            <DropDown
              items={["Wood", "Bronze", "Silver", "Gold", "Platinum"]}
              fullWidth
              onSelect={() => {}}
            />
          </Container>
        </Container>
        <Container intent="flexRowBetween" gap="medium">
          <Button
            intent="secondary"
            size="medium"
            fullWidth
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            fullWidth
            onClick={() => onCreate()}
          >
            Create
          </Button>
        </Container>
      </Container>
    </Container>
  );
};
