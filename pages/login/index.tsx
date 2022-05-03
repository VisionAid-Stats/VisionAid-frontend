import React, { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import type { NextPage } from "next";
import { Formik, Form } from "formik";

import {
  Box,
  Container,
  Heading,
  Spacer,
  Stack,
  Button,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

import { API_PATH, TOKEN_NAME, useAuth } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  useAuth("ALL");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("Login failed, please try again");
  const [cookie, setCookie] = useCookies([TOKEN_NAME]);

  useEffect(() => {
    if (!!cookie.vision_aid_session) {
      window.location.href = "/";
    }
  }, [cookie]);

  const onLoginComplete = useCallback(
    (data) => {
      if (data.success === true) {
        setCookie(TOKEN_NAME, data.token, { path: "/" });
      } else {
        setError(data.error);
        setShowAlert(true);
      }
    },
    [setCookie, setShowAlert]
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
          <Heading size="l">Log in</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            fetch(`${API_PATH}/user/login?` + new URLSearchParams(values))
              .then((response) => response.json())
              .then((data) => onLoginComplete(data));
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Stack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <PasswordInput id="password" label="Password" />

                <Button mt={4} colorScheme="teal" type="submit">
                  Log In
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
