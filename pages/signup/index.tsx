import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";

import {
  Box,
  Container,
  Heading,
  Spacer,
  Stack,
  Alert,
  AlertIcon,
  CloseButton,
  Button,
  CheckboxGroup,
  HStack,
  Checkbox,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  useAuth("ALL");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Stack>
        {showAlert && (
          <Alert status={error ? "error" : "success"} variant="subtle">
            <AlertIcon />
            {error ? error : "Account successfully created"}
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
          <Heading size="l">Create a new program manager account</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{ is_pm: true, is_admin: false }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/user/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => response.json())
              .then((value) => {
                if (value.success !== "true") {
                  setError(value.error);
                }
                window.scrollTo(0, 0);
                setShowAlert(true);
              });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Stack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <BasicInput id="name" label="Name" isRequired />

                <PasswordInput id="password" label="Password" />

                <Button mt={4} colorScheme="teal" type="submit">
                  Sign Up
                </Button>
                <Spacer />
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Container>
  );
};

export default Page;
