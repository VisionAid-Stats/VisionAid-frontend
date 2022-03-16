import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
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
  CheckboxGroup,
  Checkbox,
  HStack,
} from "@chakra-ui/react";

import { Navbar, BasicInput, SelectInput } from "../../components";
import { API_PATH } from "../../routes";
import { setDefaultResultOrder } from "dns";

const Root = styled.div`
  height: 100vh;
`;

const DateSelectorWrapper = styled.div`
  position: absolute;
  top: 40px;
  padding-left: 5px;
`;

const Students: NextPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Root>
      <Navbar />
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
              console.log(values);
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
                      console.log(checked);
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
    </Root>
  );
};

export default Students;
