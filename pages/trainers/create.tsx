import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";
import "react-datepicker/dist/react-datepicker.css";

import styled from "@emotion/styled";
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
} from "@chakra-ui/react";

import { Navbar, BasicInput } from "../../components";
import { API_PATH } from "../../common";

const Root = styled.div`
  height: 100vh;
`;

const Trainers: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Root>
      <Navbar />
      <Container>
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
            <Heading size="l">Add a course</Heading>
          </Box>
          <Spacer />
          <Formik
            initialValues={{}}
            onSubmit={(values) => {
              const response = fetch(`${API_PATH}/trainer/create`, {
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
                <VStack spacing={10} align="flex-start">
                  <BasicInput id="name" label="Trainer Name" isRequired />
                  <BasicInput id="email" label="Trainer Email" isRequired />
                  <BasicInput id="location" label="Location" isRequired />

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
    </Root>
  );
};

export default Trainers;