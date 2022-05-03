import React from "react";
import type { AppProps } from "next/app";

import styled from "@emotion/styled";
import { ChakraProvider } from "@chakra-ui/react";

import { Navbar } from "../components";

const Root = styled.div`
  height: 100vh;
`;

const Body = styled.div`
  margin-top: 3%;
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Root>
        <Navbar />
        <Body>
          <Component {...pageProps} />
        </Body>
      </Root>
    </ChakraProvider>
  );
}

export default App;
