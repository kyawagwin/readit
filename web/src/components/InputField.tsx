import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputProps<HTMLInputElement> & {
  label: string;
  textarea?: boolean;
  name: string;
};

/// !!error force convert
// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);

  const InputOrTextarea = textarea ? Textarea : Input;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
