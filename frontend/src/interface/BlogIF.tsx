export interface BlogIF {
  title: string;
  content: string;
  category: CategoryIF;
  date: string;
  image: string;
}

export interface CategoryIF {
  name: string;
}
