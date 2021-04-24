import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components";
import { supabase } from "../lib/supabase";
import { LoginFields, validateLoginForm, ValidationError } from "../lib/validation";

export default function Login() {
  const router = useRouter();
  const formRef = useRef(null);

  async function handleSubmit(fields: LoginFields) {
    try {
      formRef.current.setErrors({});
      await validateLoginForm(fields);

      const { email, password } = fields;

      const res = await supabase.auth.signIn({ email, password });
      const { id } = res.user;

      router.push(`/dev/${id}`);
    } catch (e) {
      console.error(e);

      if (e instanceof ValidationError) {
        formRef.current.setErrors(
          e.inner.reduce(
            (all, error) => ({ ...all, [error.path]: error.message }),
            {}
          )
        );
      }
    }
  }

  async function loginWithGithub() {
    supabase.auth.signIn({ provider: 'github' })
  }

  return (
    <main>
      <h1>Login time</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>We'll need your email</label>
        <Input name="email" type="email" />
        <label>And also your password (leave blank if you prefer a magic link!)</label>
        <Input name="password" type="password" />
      </Form>
      <hr />
      <h6>Or</h6>
      <button onClick={loginWithGithub}>
        Login with Github
      </button>
    </main>
  );
}
