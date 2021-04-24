import { useField } from "@unform/core";
import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import styled from "styled-components";

type InputProps = {
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ name, ...rest }: InputProps) {
  const ref = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => (ref.current.value = value),
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputRoot>
      <input ref={ref} defaultValue={defaultValue} {...rest} />
      <span className={clsx(`error`, { visible: error })}>{error}</span>
    </InputRoot>
  );
}

const InputRoot = styled.div`
  input {
    padding: 1em 2em;
  }
  .error {
    opacity: 0;
    transition: all 0.3s ease;
  }
  .visible.error {
    opacity: 1;
  }
`;
