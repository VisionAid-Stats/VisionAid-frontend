import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";

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
  CheckboxGroup,
  Checkbox,
  HStack,
} from "@chakra-ui/react";

import { BasicInput } from "../../components";
import { API_PATH, useAuth } from "../../common";

const Page: NextPage = () => {
  useAuth("ADMIN");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container>
      <Stack>
        {showAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            Course successfully created
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
          initialValues={{ is_online: false, is_offline: false }}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/course/create`, {
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
                <BasicInput id="name" label="Course Name" isRequired />
                <BasicInput id="code" label="Course Code" isRequired />

                <CheckboxGroup
                  onChange={(checked: string[]) => {
                    if (
                      checked.indexOf("e_learning") !== -1 ||
                      checked.indexOf("virtual") !== -1
                    ) {
                      setFieldValue("is_online", true);
                    } else {
                      setFieldValue("is_online", false);
                    }
                    if (checked.indexOf("classroom") !== -1) {
                      setFieldValue("is_offline", true);
                    } else {
                      setFieldValue("is_offline", false);
                    }
                  }}
                >
                  <HStack>
                    <Checkbox value="e_learning">E-Learning</Checkbox>
                    <Checkbox value="virtual">Virtual</Checkbox>
                    <Checkbox value="classroom">Classroom</Checkbox>
                  </HStack>
                </CheckboxGroup>

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
