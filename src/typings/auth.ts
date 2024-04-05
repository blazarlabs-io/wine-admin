import { User } from "firebase/auth";

export interface NewUserInterface {
  email: string;
  password: string;
  tier: string;
  level: string;
}

export interface UserToEditOrDeleteInterface extends User {
  password: string;
}
