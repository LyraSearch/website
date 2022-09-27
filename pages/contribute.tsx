import Image from "next/image";
import {
  Box,
  Code,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

import team from "../data/team.json";
import Head from "next/head";

export default function Contribute() {
  return (
    <Box
      w="full"
      bgGradient="linear(to-b, #5200FF, #080419)"
      pt={["24", "40"]}
      px="6"
    >
      <Head>
        <title>Contribute to Lyra</title>
        <meta
          name="description"
          content="Lyra is free and open-source, join the community and help us build
            the best search engine out there!"
        />
      </Head>
      <Box maxW="container.xl" m="auto">
        <Heading as="h1" fontSize="4xl" textAlign="center">
          Contribute to Lyra
        </Heading>

        <Box maxW="container.md" m="auto" mt="10">
          <Text as="p">
            Lyra is free and open-source, join the community and help us build
            the best search engine out there!
          </Text>

          <Text as="p" mt="5">
            When contributing to Lyra, please first discuss the change you wish
            to make via issue, email, or any other method with the owners of
            <Text
              as="a"
              color="pink.500"
              href="https://github.com/LyraSearch/lyra"
              target="_blank"
            >
              {" "}
              the repository{" "}
            </Text>
            before making a change. <br />
            <br />
            Please note that we have a
            <Text
              as="a"
              color="pink.500"
              href="https://github.com/LyraSearch/lyra/blob/main/CONTRIBUTING.md#code-of-conduct"
              target="_blank"
            >
              {" "}
              code of conduct{" "}
            </Text>
            and we kindly ask any contributors to follow it in all of their
            interactions with the project.
          </Text>

          <Text as="h2" mt="10" fontSize="2xl" fontWeight="bold">
            Pull Request Process
          </Text>
          <Text as="p" mt="5">
            <OrderedList>
              <ListItem>
                Ensure any install or build dependencies are removed before the
                end of the layer when doing a build. <br />
              </ListItem>
              <ListItem>
                Update the <Code colorScheme="purple">README.md</Code> with
                details of changes to the interface, this includes new
                environment variables, exposed ports, useful file locations and
                container parameters. <br />
              </ListItem>
              <ListItem>
                Commit your changes by using the
                <Code colorScheme="purple">pnpm|yarn|npm</Code> commit command.
                This will enforce linting and tests before completing the
                commit. <br />
              </ListItem>
            </OrderedList>
          </Text>
        </Box>

        <Heading mb={["6", "20"]} mt={["10", "20"]} as="h2" textAlign="center">
          The Lyra core team
        </Heading>

        <Flex
          direction={["column", "row"]}
          pb={["4", "20"]}
          justifyContent="center"
          alignItems="center"
        >
          {team.core.map((member) => (
            <Flex
              mb={["10", "0"]}
              key={member.name}
              display="flex"
              alignItems="center"
              mx="10"
            >
              <Box pos="relative" w="24" h="24" mr="4">
                <Image
                  src={member.image}
                  layout="fixed"
                  width="60"
                  height="60"
                  objectFit="cover"
                  style={{ borderRadius: "100%" }}
                />
              </Box>
              <Box>
                <Flex alignItems="center">
                  <Text as="h3" fontSize={["lg", "xl"]} fontWeight="bold">
                    {member.name}
                  </Text>
                </Flex>
                <Text as="p" textAlign={["left", "center"]}>
                  {member.role}
                </Text>
                <Flex mt="2">
                  <Text
                    as="a"
                    cursor="pointer"
                    href={`https://github.com/${member.social.github}`}
                    target="_blank"
                    mr="2"
                  >
                    <FaGithub size="20" />
                  </Text>
                  <Text
                    as="a"
                    cursor="pointer"
                    href={`https://twitter.com/${member.social.twitter}`}
                    target="_blank"
                    mr="2"
                  >
                    <FaTwitter size="20" />
                  </Text>
                  <Text
                    as="a"
                    cursor="pointer"
                    href={`https://linkedin.com/in/${member.social.linkedin}`}
                    target="_blank"
                    mr="2"
                  >
                    <FaLinkedin size="20" />
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
