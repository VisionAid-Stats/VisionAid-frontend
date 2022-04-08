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

import { API_PATH } from "../../../../common";
import { Formik, Form } from "formik";
import { BasicInput, SelectInput } from "../../../../components";

const courseListTransformer = (courses) => {
  if (!!courses) {
    return courses.map((course) => {
      return {
        label: course.name,
        value: course.course_id,
      };
    });
  }
  return [];
};

const trainerListTransformer = (trainers) => {
  if (!!trainers) {
    return trainers.map((trainer) => {
      return {
        label: trainer.name,
        value: trainer.trainer_id,
      };
    });
  }
  return [];
};

const pmListTransformer = (pms) => {
  if (!!pms) {
    return pms.map((pm) => {
      return {
        label: pm.name,
        value: pm.user_id,
      };
    });
  }
  return [];
};

const centreListTransformer = (centres) => {
  if (!!centres) {
    return centres.map((centre) => {
      return {
        label: centre.location,
        value: centre.centre_id,
      };
    });
  }
  return [];
};

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (id !== undefined) {
      fetch(`${API_PATH}/course_offering/get_by_id?course_offering_id=${id}`)
        .then((response) => response.json())
        .then((json) => setData(json[0]));
    }
  }, [id]);

  const [courseList, setCourseList] = useState();
  const [trainerList, setTrainerList] = useState();
  const [pmList, setPMList] = useState();
  const [centreList, setCentreList] = useState();

  useEffect(() => {
    fetch(`${API_PATH}/course/get_all`)
      .then((response) => response.json())
      .then((json) => setCourseList(courseListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/trainer/get_all`)
      .then((response) => response.json())
      .then((json) => setTrainerList(trainerListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/user/get_pms`)
      .then((response) => response.json())
      .then((json) => setPMList(pmListTransformer(json)));
  }, []);

  useEffect(() => {
    fetch(`${API_PATH}/centre/get_all`)
      .then((response) => response.json())
      .then((json) => setCentreList(centreListTransformer(json)));
  }, []);

  console.log(data);
  return (
    <Container>
      <Box>
        <Heading size="l">Edit Course Offering</Heading>
      </Box>
      <Stack>
        <Formik
          enableReinitialize
          initialValues={{
            course_offering_id: id,
            course_id: data.course_id,
            trainer_id: data.trainer_id,
            pm_user_id: data.pm_user_id,
            centre_id: data.centre_id,
          }}
          onSubmit={(values) => {
            console.log(values);
            const response = fetch(`${API_PATH}/course_offering/update`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((value) => {
              window.location.href = "/courses/offering";
            });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <VStack spacing={10} align="flex-start">
                <SelectInput
                  id="course_id"
                  label="Course"
                  placeholder="Select course to offer..."
                  isRequired
                  options={courseList}
                />
                <SelectInput
                  id="trainer_id"
                  label="Trainer"
                  placeholder="Select trainer..."
                  isRequired
                  options={trainerList}
                />

                <SelectInput
                  id="pm_user_id"
                  label="Program Manager"
                  placeholder="Select program manager..."
                  isRequired
                  options={pmList}
                />

                <SelectInput
                  id="centre_id"
                  label="Centre"
                  placeholder="Select centre..."
                  isRequired
                  options={centreList}
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
