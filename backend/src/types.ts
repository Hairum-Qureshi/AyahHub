type UserPayload = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

export type { UserPayload, AuthRequest };
