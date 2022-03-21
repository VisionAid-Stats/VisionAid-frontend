import React from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";

import {
  Box,
  Container,
  Heading,
  Spacer,
  Stack,
  Button,
} from "@chakra-ui/react";

import { API_PATH } from "../../common";
import { BasicInput, PasswordInput } from "../../components";

const Page: NextPage = () => {
  return (
    <Container>
      <Stack>
        <Box>
          <Heading size="l">Log in</Heading>
        </Box>
        <Spacer />
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            const response = fetch(
              `${API_PATH}/user/login?` + new URLSearchParams(values)
            )
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Stack spacing={10} align="flex-start">
                <BasicInput id="email" label="Email" isRequired />

                <PasswordInput id="password" label="Password" />

                <Button mt={4} colorScheme="teal" type="submit">
                  Submit
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
