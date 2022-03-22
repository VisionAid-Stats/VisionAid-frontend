import React, { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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

import { API_PATH, TOKEN_NAME } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [cookie, setCookie] = useCookies([TOKEN_NAME]);
  const { push } = useRouter();

  useEffect(() => {
    if (!!cookie.vision_aid_session) {
      push("/");
    }
  }, [cookie]);

  const onLoginComplete = useCallback(
    (data) => {
      console.log(data);
      if (data.success === true) {
        setCookie(TOKEN_NAME, data.token, { path: "/" });
      } else {
        setShowAlert(true);
      }
    },
    [setCookie, setShowAlert]
  );

  return (
    <Container>
      <Stack>
        {showAlert && (
          <Alert status="error" variant="subtle">
            <AlertIcon />
            Login failed, please try again
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
