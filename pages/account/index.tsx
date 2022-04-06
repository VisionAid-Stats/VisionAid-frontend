import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";
import { useCookies } from "react-cookie";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useSession, TOKEN_NAME } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  const [_cookie, _setCookie, removeCookie] = useCookies([TOKEN_NAME]);
  const [showAlert, setShowAlert] = useState(false);

  const { userId, name, email } = useSession();

  const initalData = {
    user_id: userId,
    name: name,
    email: email,
  };

  return (
    <Container>
      <Box>
        <Heading size="l">Account settings</Heading>
      </Box>

      <Stack>
        {showAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            <VStack>
              <Box>Account settings successfully updated!</Box>
              <Box>You will be logged out shortly...</Box>
            </VStack>
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
        <Spacer />
        <Formik
          initialValues={initalData}
          onSubmit={(values) => {
            console.log(values);
            const response = fetch(`${API_PATH}/user/update`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.scrollTo(0, 0);
              setShowAlert(true);
              removeCookie(TOKEN_NAME);
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput
                  id="name"
                  label="Name"
                  placeholder={name}
                  isRequired
                />
                <BasicInput
                  id="email"
                  label="Email"
                  placeholder={email}
                  isRequired
                />
                <PasswordInput
                  id="password"
                  label="New Password"
                  isRequired={false}
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
