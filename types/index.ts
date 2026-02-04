import { JSX, ReactNode } from "react";

export type TSession = {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: {
    id: string;
    email: string | null;
    name: string | null;
    avatarUrl: string | null;
  };
};

export interface BasicIconProps {
  size?: number;
  color?: string;
}

export type BasicIcon = ({ size, color }: BasicIconProps) => JSX.Element;
