export type IRootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Category: undefined;
  Election: undefined;
};

export interface IUser {
  id: string;
  email: string;
  name: string;
  isElecting: boolean;
  isCandidate: boolean;
  isEmailVerified: boolean;
}