import axios from "axios";
import * as Yup from "yup";

export { ValidationError } from "yup";

const email = Yup.string().email().required();
const password = Yup.string().min(6).required();
const optionalPassword = Yup.string().min(6);
const username = Yup.string().required()

const registerSchema = Yup.object().shape({
  email,
  password,
});

export type RegisterFields = Yup.TypeOf<typeof registerSchema>;

export function validateRegisterForm(fields: RegisterFields) {
  return registerSchema.validate(fields, {
    abortEarly: false,
  });
}

const loginSchema = Yup.object().shape({
  email,
  password: optionalPassword,
});

export type LoginFields = Yup.TypeOf<typeof loginSchema>;

export function validateLoginForm(fields: LoginFields) {
  return loginSchema.validate(fields, {
    abortEarly: false,
  });
}

const setupSchema = Yup.object().shape({
  username
})

export type SetupFields = Yup.TypeOf<typeof setupSchema>

export async function validateSetupForm(fields: SetupFields) {
  const res = await setupSchema.validate(fields, {
    abortEarly: false,
  })
  const { data } = await axios.get(`/api/exists?username=${fields.username}`)
  if (data.exists) {
    throw new Yup.ValidationError('username exists', fields.username, 'username')
  }
  return res
}