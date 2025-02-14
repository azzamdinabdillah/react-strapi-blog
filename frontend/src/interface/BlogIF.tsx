import { ReactNode } from "react";

export interface BlogIF {
  title: string;
  content: ReactNode | string;
  category: CategoryIF;
  date: string;
  image: string;
  author?: string;
  createdAt?: string;
  description?: string;
  documentId?: string;
  slug?: string;
}

export interface CategoryIF {
  name: string;
}
