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

import { API_PATH, useAuth } from "../../../common";
import { BasicInput, PasswordInput } from "../../../components";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Stack>
        {showAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            Account successfully created
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
          <Heading size="l">Create user</Heading>
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
            }).then((value) => {
              window.location.href = "/admin";
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Stack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <BasicInput id="name" label="Name" isRequired />

                <PasswordInput id="password" label="Password" />

                <Checkbox
                  name="is_admin"
                  isChecked={values.is_admin}
                  onChange={(e) => {
                    setFieldValue("is_admin", e.target.checked);
                  }}
                >
                  Create user with admin privilege
                </Checkbox>

                <Button mt={4} colorScheme="teal" type="submit">
                  Create
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
