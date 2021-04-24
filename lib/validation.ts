import * as Yup from "yup";

export { ValidationError } from "yup";

const email = Yup.string().email().required();
const password = Yup.string().min(6).required();
const username = Yup.string().required();

const registerSchema = Yup.object().shape({
  email,
  password,
  username,
});

export type RegisterFields = Yup.TypeOf<typeof registerSchema>;

export function validateRegisterForm(fields: RegisterFields) {
  return registerSchema.validate(fields, {
    abortEarly: false,
  });
}

const loginSchema = Yup.object().shape({
  email,
  password,
});

export type LoginFields = Yup.TypeOf<typeof loginSchema>;

export function validateLoginForm(fields: LoginFields) {
  return loginSchema.validate(fields, {
    abortEarly: false,
  });
}
