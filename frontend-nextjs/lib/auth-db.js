// frontend-nextjs/lib/auth-db.js

export const users = [];
export let userIdCounter = 1;

export const incrementUserIdCounter = () => {
  userIdCounter++;
};
