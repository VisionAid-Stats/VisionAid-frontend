import React from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

export const BasicInput = ({ id, label, isRequired }) => {
  return (
    <Box>
      <Field name={id}>
        {({ field }) => (
          <FormControl isRequired={isRequired}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Input id={id} {...field} />
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
