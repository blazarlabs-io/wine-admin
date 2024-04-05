import { User } from "firebase/auth";

export interface TabItemInterface {
  label: string;
  icon: string;
  selected: boolean;
}

export interface TabGroupProps {
  items: TabItemInterface[];
  onSelect: (item: TabItemInterface) => void;
}

export interface UserAvatarProps {
  user: User;
}
