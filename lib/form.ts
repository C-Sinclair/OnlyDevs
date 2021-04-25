import { MutableRefObject } from "react";
import { ValidationError } from "yup";
import { LoginFields, RegisterFields, SetupFields } from "./validation";

type Fields = LoginFields | RegisterFields | SetupFields

type FieldFunction<T = Fields> = (fields: T) => Promise<any>

export function formSubmit<T = Fields>(formRef: MutableRefObject<any>, validator: FieldFunction<T>, callback: FieldFunction<T>) {
  return async (fields: T) => {
    try {
      formRef.current.setErrors({})
      await validator(fields)
      await callback(fields)
    } catch (e) {
      console.error(e)
  
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
}
