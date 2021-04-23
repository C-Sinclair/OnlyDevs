import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components";
import { supabase } from "./_supabase";
import { LoginFields, validateLoginForm, ValidationError } from "./_validation";

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
  return (
    <main>
      <h1>Login time</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>We'll need your email</label>
        <Input name="email" type="email" />
        <label>And also your password</label>
        <Input name="password" type="password" />
      </Form>
    </main>
  );
}
