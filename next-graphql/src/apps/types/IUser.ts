interface IUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  image: { url: string; public_id: string };
  comments: string[];
  passwordHash: string;
  token: string;
}

export type { IUser };
