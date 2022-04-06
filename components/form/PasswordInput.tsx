import React, { useCallback, useState } from "react";
import { Field } from "formik";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";

type PasswordInputProps = {
  id: string;
  label: string;
  size?: "xs" | "sm" | "md" | "lg";
  isRequired?: boolean;
};

export const PasswordInput = ({
  id,
  label,
  size,
  isRequired = true,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const toggleShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <Box>
      <Field name={id}>
        {({ field }) => (
          <FormControl isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <InputGroup>
              <Input
                id={id}
                {...field}
                size={size}
                type={show ? "text" : "password"}
              />
              <InputRightElement>
                <Button size="sm" onClick={toggleShow}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
