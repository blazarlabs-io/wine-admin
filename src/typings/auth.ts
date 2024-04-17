import { User } from "firebase/auth";

export interface UserInterface {
  email: string;
  password: string;
  tier: string;
  level: string;
}

export interface UserToEditOrDeleteInterface extends User {
  password: string;
  tier: string;
  level: string;
}
