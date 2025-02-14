import { ReactNode } from "react";

export interface BlogIF {
  title: string;
  content: ReactNode | string;
  category: CategoryIF;
  date: string;
  image: string;
  author?: string;
  createdAt?: string
}

export interface CategoryIF {
  name: string;
}
