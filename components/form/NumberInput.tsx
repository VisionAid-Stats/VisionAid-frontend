import React from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

type NumberInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  min?: number;
  max?: number;
};

export const NumberInput = ({
  id,
  label,
  placeholder,
  isRequired = false,
  size,
  min,
  max,
}: NumberInputProps) => {
  return (
    <Box>
      <Field name={id}>
        {({ field }) => (
          <FormControl isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Input
              id={id}
              {...field}
              size={size}
              placeholder={placeholder}
              type="number"
              min={min}
              max={max}
            />
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
