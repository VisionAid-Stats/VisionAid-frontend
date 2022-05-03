import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { API_PATH, useAuth } from "../../../../../common";
import { Formik, Form, Field } from "formik";
import { BasicInput, SelectInput } from "../../../../../components";

const Page: NextPage = () => {
  useAuth("PM");
  const router = useRouter();
  const { id } = router.query;
  const [courseOffering, setCourseOffering] = useState<any[]>([]);
  const [checklistData, setChecklistData] = useState<any>();

  useEffect(() => {
    if (!!id) {
      fetch(`${API_PATH}/course_offering/get_by_id?course_offering_id=${id}`)
        .then((response) => response.json())
        .then((json) => setCourseOffering(json));
    }
  }, [id]);

  useEffect(() => {
    if (!!id) {
      fetch(
        `${API_PATH}/course_offering/get_checklist?course_offering_id=${id}`
      )
        .then((response) => response.json())
        .then((json) => setChecklistData(json));
    }
  }, [id]);

  console.log(checklistData);

  const checklistRow = (name, date, setFieldValue) => {
    return (
      <Tr>
        <Td>
          <Checkbox
            name={name + "_completion"}
            isChecked={date}
            onChange={(e) => {
              if (e.target.checked) {
                const today = new Date();
                setFieldValue(
                  name + "_completion",
                  today.toISOString().split("T")[0]
                );
              } else {
                setFieldValue(name + "_completion", null);
              }
            }}
          />
        </Td>
        <Td>
          <Field name={name + "_remarks"}>
            {({ field }) => (
              <FormControl isRequired={false}>
                <Input id={name + "_remarks"} {...field} />
              </FormControl>
            )}
          </Field>
        </Td>
        <Td>{date ? date : "N/A"}</Td>
      </Tr>
    );
  };

  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Box>
        <Heading size="l">
          Checklist{" "}
          {courseOffering.length !== 0
            ? `for ${courseOffering[0].course_name}`
            : ""}
        </Heading>
      </Box>
      <Formik
        enableReinitialize
        initialValues={checklistData}
        onSubmit={(values) => {
          const response = fetch(
            `${API_PATH}/course_offering/update_checklist`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }
          )
            .then((response) => response.json())
            .then((value) => {
              console.log(value);
              window.location.href = `/manage/${id}`;
            });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Table>
              <Thead>
                <Tr>
                  <Th>Completed</Th>
                  <Th>Item</Th>
                  <Th>Completion Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {checklistRow(
                  "item_1",
                  values?.item_1_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_2",
                  values?.item_2_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_3",
                  values?.item_3_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_4",
                  values?.item_4_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_5",
                  values?.item_5_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_6",
                  values?.item_6_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_7",
                  values?.item_7_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_8",
                  values?.item_8_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_9",
                  values?.item_9_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_10",
                  values?.item_10_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_11",
                  values?.item_11_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_12",
                  values?.item_12_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_13",
                  values?.item_13_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_14",
                  values?.item_14_completion,
                  setFieldValue
                )}
                {checklistRow(
                  "item_15",
                  values?.item_15_completion,
                  setFieldValue
                )}
              </Tbody>
            </Table>
            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Page;
