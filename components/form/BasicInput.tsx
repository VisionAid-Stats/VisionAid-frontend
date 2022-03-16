import React from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

type BasicInputProps = {
  id: string;
  label: string;
  isRequired: boolean;
  size?: "xs" | "sm" | "md" | "lg";
};

export const BasicInput = ({
  id,
  label,
  isRequired,
  size,
}: BasicInputProps) => {
  return (
    <Box>
      <Field name={id}>
        {({ field }) => (
          <FormControl isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Input id={id} {...field} size={size} />
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
