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
import { API_PATH, useAuth } from "../../common";

const Page: NextPage = () => {
  useAuth("ALL");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container>
      <Stack>
        {showAlert && (
          <Alert status="error" variant="subtle">
            <AlertIcon />
            An error occurred, please try again later
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
          <Heading size="l">Student Application Form</Heading>
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
            })
              .then((response) => response.json())
              .then((value) => {
                if (value.success) {
                  window.location.href = `/students/interests/${value.student_id}`;
                } else {
                  window.scrollTo(0, 0);
                  setShowAlert(true);
                }
              });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <BasicInput id="name" label="Name" isRequired />

                <BasicInput id="mobile" label="Mobile Number" isRequired />

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

                <Field name="age">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <NumberInput
                        step={1}
                        id="age"
                        width={100}
                        min={0}
                        clampValueOnBlur
                      >
                        <NumberInputField {...field} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}
                </Field>

                <BasicInput
                  id="address"
                  label="What city and state are you from?"
                  isRequired
                />

                <BasicInput
                  id="learning_objectives"
                  label="What are your long term learning objectives?"
                  isRequired={false}
                />

                <BasicInput
                  id="visual_impairment"
                  label="Provide a brief history of your vision impairment"
                  isRequired
                />

                <BasicInput
                  id="usable_vision"
                  label="What is your usable vision in terms of acuity and field?"
                  isRequired={false}
                />

                <Field name="pct_vision_loss">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="pct_vision_loss">
                        What is the percentage of vision loss?
                      </FormLabel>
                      <NumberInput
                        step={10}
                        id="pct_vision_loss"
                        width={100}
                        min={0}
                        max={100}
                        clampValueOnBlur
                      >
                        <NumberInputField {...field} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}
                </Field>

                <BasicInput
                  id="hear_about"
                  label="How did you hear about the program?"
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
