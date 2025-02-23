export interface AuthIF {
  success: true;
  status: number;
  data: {
    jwt: string;
    user: {
      id: number;
      documentId: string;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface AuthErrorIF {
  data: any;
  success: false;
  error: {
    status: 400;
    name: string;
    message: string;
    details: {};
  };
}
