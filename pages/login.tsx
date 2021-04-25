import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";
import { GithubLoginButton, Input } from "../components";
import { formSubmit } from "../lib/form";
import { supabase } from "../lib/supabase";
import { LoginFields, validateLoginForm, ValidationError } from "../lib/validation";

export default function Login() {
  const router = useRouter();
  const formRef = useRef(null);

  const handleSubmit = formSubmit(formRef, validateLoginForm, async (fields: LoginFields) => {
    const { email, password } = fields;
    await supabase.auth.signIn({ email, password });
    router.push(`/`);
  })

  return (
    <main>
      <h1>Login time</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>We'll need your email</label>
        <Input name="email" type="email" />
        <label>And also your password (leave blank if you prefer a magic link!)</label>
        <Input name="password" type="password" />
        <button type='submit'>
          Login
        </button>
      </Form>
      <hr />
      <h6>Or</h6>
      <GithubLoginButton />
    </main>
  );
}
