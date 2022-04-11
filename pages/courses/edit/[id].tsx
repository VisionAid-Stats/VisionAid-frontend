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

import { API_PATH } from "../../../common";
import { Formik, Form } from "formik";
import { BasicInput } from "../../../components";

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/course/get_by_id?course_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  const initialData = {
    course_id: id,
    name: data.name,
    code: data.code,
    is_offline: data.is_offline === 1,
    is_online: data.is_online === 1,
  };
  return (
    <Container>
      <Box>
        <Heading size="l">Edit Course {data.code}</Heading>
      </Box>
      <Stack>
        <Formik
          enableReinitialize
          initialValues={initialData}
          onSubmit={(values) => {
            const response = fetch(`${API_PATH}/course/update`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                code:
                  values.code === initialData.code ? undefined : values.code,
                course_id: id,
                is_offline: values.is_offline,
                is_online: values.is_online,
              }),
            }).then((value) => {
              window.location.href = "/courses";
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <BasicInput id="name" label="Name" isRequired />
                <BasicInput id="code" label="Course Code" isRequired />
                <HStack>
                  <Checkbox
                    name="is_online"
                    isChecked={values.is_online}
                    onChange={(e) => {
                      setFieldValue("is_online", e.target.checked);
                    }}
                  >
                    Online
                  </Checkbox>
                  <Checkbox
                    name="is_offline"
                    isChecked={values.is_offline}
                    onChange={(e) => {
                      setFieldValue("is_offline", e.target.checked);
                    }}
                  >
                    Offline
                  </Checkbox>
                </HStack>

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