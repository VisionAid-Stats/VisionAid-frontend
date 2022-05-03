import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";

import {
  Container,
  Heading,
  Stack,
  Button,
  Box,
  VStack,
  Spacer,
  Alert,
  AlertIcon,
  CloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import { BasicInput, SelectInput } from "../../components";
import { API_PATH, useAuth } from "../../common";
import { stat } from "fs";

const statesTransformer = (statesData) => {
  return statesData.map((state) => ({
    value: state.value,
    label: state.value,
  }));
};

const Page: NextPage = () => {
  useAuth("ADMIN");
  const [showAlert, setShowAlert] = useState(false);
  const [statesData, setStatesData] = useState();

  useEffect(() => {
    fetch(`${API_PATH}/trainer/states`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setStatesData(statesTransformer(data));
      });
  }, []);

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Stack>
        {showAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            Trainer successfully created
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
          <Heading size="l">Add a trainer</Heading>
        </Box>
        <Spacer />
        <Formik
          enableReinitialize
          initialValues={{}}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/trainer/create`, {
              method: "POST",
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
                <BasicInput id="name" label="Trainer Name" isRequired />
                <BasicInput id="email" label="Trainer Email" isRequired />
                <BasicInput id="location" label="Location" isRequired />

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
