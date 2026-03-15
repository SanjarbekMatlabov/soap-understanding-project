export type User = {
  id: string;
  name: string;
  email: string;
};

export type FormState = {
  name: string;
  email: string;
  password: string;
};

export const initialFormState: FormState = {
  name: "",
  email: "",
  password: "",
};
