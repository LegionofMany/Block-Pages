export interface User {
  id: string;
  name: string;
  email: string;
  walletAddress?: string;
}

export const users: User[] = [];
export let userIdCounter = 1;

export const incrementUserIdCounter = () => {
  userIdCounter++;
};
