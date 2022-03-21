import React from "react";
import type { NextPage } from "next";
import { Container, Text, Stack, Image } from "@chakra-ui/react";

const Page: NextPage = () => {
  return (
    <Container>
      <Stack>
        <Text fontSize="xx-large">About us</Text>
        <Text fontSize="medium">
          Vision-Aid Academy is a nonprofit organization that specializes in
          helping people with visual impairments through offering courses that
          are taught with an emphasis on accessibility.
        </Text>
        <Image src="banner.png" />
        <Image src="wheel.png" />
      </Stack>
    </Container>
  );
};

export default Page;
