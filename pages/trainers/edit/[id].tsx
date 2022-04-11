import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { API_PATH } from "../../../common";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../components";

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/trainer/get_by_id?trainer_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  const intialData = {
    trainer_id: id,
    name: data.name,
    email: data.email,
    location: data.location,
  };

  return (
    <Container>
      <Box>
        <Heading size="l">Edit Trainer Information for {data.name}</Heading>
      </Box>
      <Stack>
        <Formik
          enableReinitialize
          initialValues={intialData}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/trainer/update`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.location.href = "/trainers";
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput id="name" label="Name" isRequired />
                <BasicInput id="email" label="Email" isRequired />
                <BasicInput id="location" label="Location" />

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
