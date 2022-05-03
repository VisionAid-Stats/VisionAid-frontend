import React, { useState } from "react";
import type { NextPage } from "next";
import {
  Stack,
  Box,
  Button,
  VStack,
  Spacer,
  Heading,
  Container,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  CloseButton,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import { BasicInput, SelectInput, NumberInput } from "../../components";
import { API_PATH, useAuth } from "../../common";

const Page: NextPage = () => {
  useAuth("ALL");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(
    "An error occurred, please try again later"
  );

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Stack>
        {showAlert && (
          <Alert status="error" variant="subtle">
            <AlertIcon />
            {error}
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
          initialValues={{}}
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
                  setError(value.error);
                  window.scrollTo(0, 0);
                  setShowAlert(true);
                }
              });
          }}
        >
          {({ setFieldValue, values }) => (
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

                <NumberInput id="age" label="Age" isRequired min={1} />

                <BasicInput
                  id="address"
                  label="What city and state are you from?"
                  isRequired
                />

                <Field name="learning_objectives">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="learning_objectives">
                        What are your long term learning objectives?
                      </FormLabel>
                      <Textarea
                        onChange={(e) => {
                          setFieldValue("learning_objectives", e.target.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="visual_impairment">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="visual_impairment">
                        Provide a brief history of your vision impairment
                      </FormLabel>
                      <Textarea
                        onChange={(e) => {
                          setFieldValue("visual_impairment", e.target.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="usable_vision">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="usable_vision">
                        What is your usable vision in terms of acuity and field?
                      </FormLabel>
                      <Textarea
                        onChange={(e) => {
                          setFieldValue("usable_vision", e.target.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>

                <NumberInput
                  id="pct_vision_loss"
                  label="What is the percentage of vision loss?"
                  isRequired
                  min={0}
                  max={100}
                />

                <Field name="hear_about">
                  {({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="hear_about">
                        How did you hear about the program?
                      </FormLabel>
                      <Textarea
                        onChange={(e) => {
                          setFieldValue("hear_about", e.target.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>

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
