import { Form } from "@unform/web";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components";
import { supabase } from "../lib/supabase";
import {
  RegisterFields,
  validateRegisterForm,
  ValidationError,
} from "../lib/validation";

export default function Register() {
  const router = useRouter();
  const formRef = useRef(null);

  async function handleSubmit(fields: RegisterFields) {
    try {
      formRef.current.setErrors({});
      await validateRegisterForm(fields);

      const { email, password, username } = fields;

      const res = await supabase.auth.signUp({ email, password });
      const { id } = res.user;

      await axios.post(`/api/dev`, {
        body: {
          id,
          username,
        },
      });

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
      <h1>Register time</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>First off pick a username</label>
        <Input name="username" />
        <label>We'll need an email</label>
        <Input name="email" type="email" />
        <label>And finally a password</label>
        <Input name="password" type="password" />
        <button type='submit'>
          Register
        </button>
      </Form>

      <button onClick={loginWithGithub}>
        Login with Github
      </button>
    </main>
  );
}
