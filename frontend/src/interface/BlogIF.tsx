import { ReactNode } from "react";

export interface BlogIF {
  title: string;
  content?: ReactNode | string;
  category: CategoryIF;
  date: string;
  image: BlogImage;
  author?: string;
  createdAt?: string;
  description?: string;
  documentId?: string;
  slug?: string;
}

export interface CategoryIF {
  name: string;
}

export interface BlogImage {
  url: string
}
