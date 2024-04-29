import { User } from "firebase/auth";
import { LevelType, TierType } from "./data";

export type ToastStatusType = "success" | "error" | "info" | "warning";
export interface ToastProps {
  show: boolean;
  status: ToastStatusType | null;
  message: string | null;
  timeout: number | null;
}

export type TextVariantType =
  | "normal"
  | "accent"
  | "dim"
  | "inverted"
  | "error"
  | "success"
  | "warning"
  | "info";

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

export interface UserForList extends User {
  wineryName: string;
  tier: TierType;
  level: LevelType;
}

export interface UsersProfileCrudProps {
  users: UserForList[];
  loading: boolean;
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
