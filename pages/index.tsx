import React, { Fragment } from "react";
import type { NextPage } from "next";
import { Container, Text, Stack, Image, Spacer } from "@chakra-ui/react";
import { useAuth } from "../common";

const Page: NextPage = () => {
  useAuth("ALL");
  return (
    <Container maxW={"90%"} maxH={"100%"} background={"white"}>
      <Stack alignItems={"center"}>
        <Text fontSize="xx-large">About us</Text>
        <Text fontSize="medium">
          Vision-Aid Academy is a nonprofit organization that specializes in
          helping people with visual impairments through offering courses that
          are taught with an emphasis on accessibility.
        </Text>
        <Spacer />
        <Image
          src="landing.png"
          alt="Vision-Aid serves the visually disadvantaged in under-served areas."
          width={1280}
          height={720}
        />
      </Stack>
    </Container>
  );
};

export default Page;
