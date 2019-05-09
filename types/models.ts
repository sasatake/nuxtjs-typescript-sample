export interface User {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  avatar: string;
  updatedAt: Date;
}

export interface UserForm {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
}
