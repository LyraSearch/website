import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Image, Show, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { ShortDemo } from "../components/ShortDemo";
import GitHubButton from "react-github-btn";
import { FloatingLogo } from "../components/FloatingLogo";

/* TODO?: Add links to projects */
const supportedRuntimes = [
  {
    name: "AWS Lambda@Edge",
    image: "/misc/runtimes/aws-lambda-edge.svg",
  },
  {
    name: "Bun",
    image: "/misc/runtimes/bun.svg",
  },
  {
    name: "Cloudflare Workers",
    image: "/misc/runtimes/cloudflare-workers.svg",
  },
  {
    name: "Deno",
    image: "/misc/runtimes/deno.svg",
  },
  {
    name: "Browsers",
    image: "/misc/runtimes/javascript.svg",
  },
  {
    name: "Netlify Functions",
    image: "/misc/runtimes/netlify-functions.svg",
  },
  {
    name: "Node.js",
    image: "/misc/runtimes/node-js.svg",
  },
  {
    name: "React Native",
    image: "/misc/runtimes/react-native.svg",
  },
];

const Home: NextPage = () => {
  const definitions = ["edge", "offline", "embedded", "universal"];
  const [definition, setDefinition] = useState(definitions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = definitions.indexOf(definition);
      const nextIndex = index + 1 === definitions.length ? 0 : index + 1;
      setDefinition(definitions[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Show above="sm">
        <Box
          pos="absolute"
          top="0"
          right="0"
          w="40%"
          h="container.md"
          bg="red"
          zIndex="0"
          bgGradient="linear(to-bl, #FF00E5, #5200FF, #00C8FF)"
          roundedBottomLeft="20%"
        />
      </Show>
      <Box
        px={["4", "0"]}
        /* h="container.sm" */ m="auto"
        pt={["24", "40"]}
        zIndex="1"
      >
        <Box
          display="flex"
          flexDir="column"
          w="full"
          h="full"
          justifyContent="center"
          label="XXXX"
        >
          <Heading fontSize="6xl" color="gray.100" lineHeight="1">
            The{" "}
            <Text
              as="span"
              bgGradient="linear(to-l, #08B5FF, #F101E8)"
              bgClip="text"
            >
              {definition}
            </Text>
            <br />
            search experience
          </Heading>
          <Text as="p" fontSize="xl" color="gray.400" mt="3">
            Lyra is a fully-featured full-text search engine that runs wherever
            JavaScript runs, including browsers, servers, React Native, edge
            networks, and more.
          </Text>
          <Box label="github buttons" display="flex" mt="5" w="full">
            <Box>
              <GitHubButton
                href="https://github.com/nearform/lyra"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star nearform/lyra on GitHub"
              >
                Star
              </GitHubButton>
            </Box>
            <Box ml="3">
              <GitHubButton
                href="https://github.com/nearform/lyra/fork"
                data-icon="octicon-repo-forked"
                data-size="large"
                data-show-count="true"
                aria-label="Fork nearform/lyra on GitHub"
              >
                Fork
              </GitHubButton>
            </Box>
          </Box>
        </Box>
        <Box
          label="banner"
          zIndex="banner"
          w="full"
          h="full"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Image
            w="container"
            h="auto"
            shadow="dark-lg"
            src="/images/code-example.png"
            alt="Example of running lyra on a JavaScript runtime"
            rounded="xl"
          />
        </Box>
      </Box>

      <Box
        px={["4", "0"]}
        w="full"
        bgGradient="linear(to-b, #5200FF, #080419)"
        mt={["14", "60"]}
      >
        <Box
          w="container"
          m="auto"
          py={["10", "20"]}
          display="flex"
          flexDirection="column"
        >
          <Box>
            {/* TODO: bullet points with core features instead of wall of text (move that text in docs if not already there) */}

            <Heading mb="10"> Why Lyra? </Heading>
            <Text textAlign="justify">
              Lyra is a modern, dependency-free full-text search engine written
              in TypeScript. <br />
              It has been built with speed in mind and completes most search
              lookups in a few microseconds.
              <br />
              <br />
              It implements a very fast, vanilla prefix tree to perform
              efficient lookups and easy serialization with multiple formats,
              such as <b>dpack</b>, <b>messagepack</b>, and{" "}
              <b>protocol buffers</b>.<br />
              <br />
              Its main focus is to be able to run on edge networks, such as{" "}
              <b>AWS Lambda@Edge</b>, <b>Cloudflare Workers</b>, and{" "}
              <b>Netlify Functions</b>, so expect some updates on that.
              <br />
              <br />
              Given that it's written in TypeScript, it can be used in{" "}
              <b>any</b> JavaScript runtime, including browsers, servers, React
              Native, and more.
              <br />
              <br />
              It was named after the Lyra constellation due to its distributed
              and highly scalable nature.
            </Text>
          </Box>

          <Box>
            <ShortDemo />
          </Box>
        </Box>
      </Box>

      <Runtimes />

      <FloatingRuntimes />
    </Box>
  );
};

import React from "react";
type Props = {};
export const Runtimes: React.FC<Props> = () => {
  const runtimesPerRow = useBreakpointValue({
    base: 4,
    sm: 8,
  });
  return (
    <Box w="full" mt={["0", "20"]}>
      <Box w="container" m="auto" pb="20">
        <Heading mb={["3", "10"]} textAlign="center">
          Runs everywhere
        </Heading>
        <Grid
          px={["4", "0"]}
          templateColumns={`repeat(${runtimesPerRow}, 1fr)`}
        >
          {supportedRuntimes.map((runtime) => (
            <Box key={runtime.name}>
              <Tooltip hasArrow label={runtime.name} placement="top">
                <Image src={runtime.image} alt={runtime.name} w="44" />
              </Tooltip>
            </Box>
          ))}
        </Grid>
        <Text textAlign="center" mt={["4", "10"]}>
          {" "}
          ...and any other JavaScript runtime.{" "}
        </Text>
      </Box>
    </Box>
  );
};

export const FloatingRuntimes: React.FC<Props> = () => {
  return (
    <Box w="full" mt={["0", "20"]}>
      <Box w="container" m="auto" pb="20">
        <Heading fontSize={["4xl", "3xl"]} mb={["3", "10"]} textAlign="center">
          Runs everywhere
        </Heading>
        <FloatingLogo />
        <Text fontSize="lg" textAlign="center" mt={["4", "10"]}>
          ...and any other JavaScript runtime.{" "}
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
