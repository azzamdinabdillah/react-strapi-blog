import { ReactNode } from "react";

export interface BlogIF {
  title: string;
  id?: string;
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
  slug?: string;
  id?: string;
  documentId?: string;
}

export interface BlogImage {
  url: string;
}
