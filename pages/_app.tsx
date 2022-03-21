import React from "react";
import type { AppProps } from "next/app";

import styled from "@emotion/styled";
import { ChakraProvider } from "@chakra-ui/react";

import { Navbar } from "../components/Navbar";

const Root = styled.div`
  height: 100vh;
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Root>
        <Navbar />
        <Component {...pageProps} />
      </Root>
    </ChakraProvider>
  );
}

export default App;
