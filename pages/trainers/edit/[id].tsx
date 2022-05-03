import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Spacer,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../common";
import { Formik, Form, Field } from "formik";
import { BasicInput, SelectInput } from "../../../components";

const statesTransformer = (statesData) => {
  return statesData.map((state) => ({
    value: state.value,
    label: state.value,
  }));
};

const Page: NextPage = () => {
  useAuth("ADMIN");
  const router = useRouter();
  const { id } = router.query;
  const [statesData, setStatesData] = useState();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/trainer/get_by_id?trainer_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  useEffect(() => {
    fetch(`${API_PATH}/trainer/states`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setStatesData(statesTransformer(data));
      });
  }, []);

  const deleteTrainer = () => {
    fetch(`${API_PATH}/trainer/disable?trainer_id=${id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((json) => {
        window.location.href = "/trainers";
      });
  };

  const intialData = {
    trainer_id: id,
    name: data.name,
    email: data.email,
    location: data.location,
    state: data.state,
    qualifications: data.qualifications,
  };

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
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
                <SelectInput
                  id="state"
                  label="State"
                  placeholder="Select state..."
                  isRequired={false}
                  options={statesData}
                />

                <Field name="qualifications">
                  {({ field }) => (
                    <FormControl isRequired={false}>
                      <FormLabel htmlFor="qualifications">
                        Qualifications
                      </FormLabel>
                      <Textarea
                        onChange={(e) => {
                          setFieldValue("qualifications", e.target.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>

                <HStack align="baseline">
                  <Button mt={4} colorScheme="teal" type="submit">
                    Submit
                  </Button>
                  <Button mt={4} colorScheme="red" onClick={deleteTrainer}>
                    Disable
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
