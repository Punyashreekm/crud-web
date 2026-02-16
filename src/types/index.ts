export interface User {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  [key: string]: any;
}
