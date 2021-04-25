import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";
import { GithubLoginButton, Input } from "../components";
import { formSubmit } from "../lib/form";
import { supabase } from "../lib/supabase";
import {
  RegisterFields,
  validateRegisterForm,
  ValidationError,
} from "../lib/validation";

export default function Register() {
  const router = useRouter();
  const formRef = useRef(null);

  const handleSubmit = formSubmit(formRef, validateRegisterForm, async (fields: RegisterFields) => {
    const { email, password } = fields;
    await supabase.auth.signUp({ email, password });
    router.push(`/setup`);
  })

  return (
    <main>
      <h1>Register time</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>We'll need an email</label>
        <Input name="email" type="email" />
        <label>And finally a password</label>
        <Input name="password" type="password" />
        <button type='submit'>
          Register
        </button>
      </Form>
      <h6>Or</h6>
      <GithubLoginButton />
    </main>
  );
}
