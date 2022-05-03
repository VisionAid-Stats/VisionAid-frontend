import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Heading,
  HStack,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";
import { Formik, Form } from "formik";
import { BasicInput, PasswordInput } from "../../../components";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/user/get_by_id?user_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">Edit User Account {data.code}</Heading>
      </Box>
      <Stack>
        <Formik
          enableReinitialize
          initialValues={{
            user_id: data.user_id,
            name: data.name,
            email: data.email,
            is_admin: data.is_admin,
            enabled: data.enabled,
          }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/user/update`, {
              method: "PUT",
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
              <VStack spacing={10} align="flex-start">
                <BasicInput id="name" label="Name" isRequired />
                <BasicInput id="email" label="Email" isRequired />
                <Checkbox
                  name="is_admin"
                  isChecked={values.is_admin}
                  onChange={(e) => {
                    setFieldValue("is_admin", e.target.checked);
                  }}
                >
                  Admin
                </Checkbox>
                <Checkbox
                  name="is_online"
                  isChecked={values.enabled}
                  onChange={(e) => {
                    setFieldValue("enabled", e.target.checked);
                  }}
                >
                  Enabled
                </Checkbox>
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
