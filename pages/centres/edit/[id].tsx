import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../components";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/centre/get_by_id?centre_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  const deleteTrainer = () => {
    fetch(`${API_PATH}/centre/delete?centre_id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        window.location.href = "/centres";
      });
  };

  const intialData = {
    centre_id: id,
    location: data.location,
  };

  return (
    <Container>
      <Box>
        <Heading size="l">Edit Centre Location for {data.location}</Heading>
      </Box>
      <Stack>
        <Formik
          enableReinitialize
          initialValues={intialData}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/centre/update`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.location.href = "/centres";
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput id="location" label="Centre Location" isRequired />

                <HStack align="baseline">
                  <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                  </Button>
                  <Button mt={4} colorScheme="red" onClick={deleteTrainer}>
                    Delete
                  </Button>
                </HStack>
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
