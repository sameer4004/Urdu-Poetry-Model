export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Shayari {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
}