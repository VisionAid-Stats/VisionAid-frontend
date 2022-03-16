import React from "react";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Field } from "formik";

type SelectInputProps = {
  id: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
};

export const SelectInput = ({
  id,
  label,
  isRequired,
  placeholder,
  options,
}: SelectInputProps) => {
  return (
    <Box>
      <Field name={id}>
        {({ field }) => (
          <FormControl isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Select placeholder={placeholder} id={id} {...field}>
              {!!options &&
                options.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
