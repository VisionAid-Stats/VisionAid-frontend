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

import { API_PATH } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container>
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
          <Heading size="l">Create a new account</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{ is_pm: false, is_admin: false }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/user/create`, {
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
              <Stack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <BasicInput id="name" label="Name" isRequired />

                <PasswordInput id="password" label="Password" />

                <CheckboxGroup
                  onChange={(checked: string[]) => {
                    if (checked.indexOf("is_pm") !== -1) {
                      setFieldValue("is_pm", true);
                    } else {
                      setFieldValue("is_pm", false);
                    }
                    if (checked.indexOf("is_admin") !== -1) {
                      setFieldValue("is_admin", true);
                    } else {
                      setFieldValue("is_admin", false);
                    }
                  }}
                >
                  <HStack>
                    <Checkbox value="is_pm">Program Manager</Checkbox>
                    <Checkbox value="is_admin">Admin</Checkbox>
                  </HStack>
                </CheckboxGroup>

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
