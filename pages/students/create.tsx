import React, { useState } from "react";
import type { NextPage } from "next";
import {
  Stack,
  Box,
  Button,
  VStack,
  Spacer,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import { BasicInput, SelectInput } from "../../components";
import { API_PATH } from "../../common";

const Page: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container>
      <Stack>
        {showAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            Course offering successfully created
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => {
                setShowAlert(false);
              }}
            />
          </Alert>
        )}

        <Box>
          <Heading size="l">Add student</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{ age: 0 }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/student/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.scrollTo(0, 0);
              setShowAlert(true);
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <BasicInput id="name" label="Name" isRequired />

                <BasicInput id="mobile" label="Mobile Number" isRequired />

                <BasicInput id="address" label="Address" isRequired />

                <Field name="age">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <NumberInput step={1} id="age" width={100}>
                        <NumberInputField {...field} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}
                </Field>

                <SelectInput
                  id="gender"
                  label="Gender"
                  placeholder="Select gender..."
                  isRequired
                  options={[
                    {
                      value: "male",
                      label: "Male",
                    },
                    {
                      value: "female",
                      label: "Female",
                    },
                    {
                      value: "other",
                      label: "Other",
                    },
                  ]}
                />

                <SelectInput
                  id="visual_acuity"
                  label="Visual Acuity"
                  placeholder="Select visual acuity..."
                  isRequired
                  options={[
                    {
                      value: "fully blind",
                      label: "Fully blind",
                    },
                    {
                      value: "low vision",
                      label: "Low vision",
                    },
                  ]}
                />

                <BasicInput
                  id="visual_impairment"
                  label="Visual Impairment"
                  isRequired
                />

                <BasicInput
                  id="hear_about"
                  label="How did you hear about us?"
                  isRequired
                />

                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
                </Button>
                <Spacer />
              </VStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Page;
