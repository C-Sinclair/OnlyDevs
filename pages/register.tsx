import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components";
import { supabase } from "./_supabase";
import {
  RegisterFields,
  validateRegisterForm,
  ValidationError,
} from "./_validation";

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

      await fetch(`/dev`, {
        method: "POST",
        body: JSON.stringify({
          id,
          username,
        }),
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
      </Form>
    </main>
  );
}
