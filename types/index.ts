// ===============================
// 🔹 GENERALES
// ===============================

export type ID = string;

export type Timestamp = string;

// ===============================
// 🔹 USUARIO (Supabase)
// ===============================

export interface User {
  id: ID;
  email: string;
  created_at: Timestamp;
}

// ===============================
// 🔹 AUTH
// ===============================

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

// ===============================
// 🔹 RESPUESTAS API
// ===============================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// ===============================
// 🔹 UI COMPONENTS
// ===============================

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ===============================
// 🔹 AUTH STATE
// ===============================

export interface AuthState {
  user: User | null;
  loading: boolean;
}
