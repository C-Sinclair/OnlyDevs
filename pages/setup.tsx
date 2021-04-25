import { Form } from "@unform/web";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Input } from "../components";
import { useAuth } from "../hooks/auth";
import { formSubmit } from "../lib/form";
import { SetupFields, validateSetupForm, ValidationError } from "../lib/validation";

export default function Setup() {
  const router = useRouter()
  const formRef = useRef(null);
  const { id } = useAuth()

  const handleSubmit = formSubmit(formRef, validateSetupForm, async (fields: SetupFields) => {
    const { username } = fields
    await axios.post(`/dev`, { username, user_id: id })
    // TODO display setup complete toast message
    router.push(`/`)
  })

  return (
    <main>
      <h1>Finish account setup</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label>Pick a username</label>
        <Input name='username' />
        <button type='submit'>
          Save
        </button>
      </Form>
    </main>
  )
}