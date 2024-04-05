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
  imageUrl: string;
  initials: string;
}

export interface UsersProfileCrudProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export interface ModalProps {
  show: boolean;
  title: string;
  description: string;
  action: {
    label: string;
    onAction: () => void;
  };
}
