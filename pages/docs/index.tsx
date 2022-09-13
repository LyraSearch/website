import type { GetStaticProps } from "next";
import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import {
  getAllPostsWithContent,
  PostsBySection,
} from "../../utils/docs/server-side";
import Link from "next/link";

interface DocsProps {
  posts: PostsBySection;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsWithContent();

  return {
    props: {
      posts,
    },
  };
};

export default function Docs(props: DocsProps) {
  const { posts } = props;
  const sections = Object.keys(posts);

  return (
    <Box maxW="container.xl" m="auto" py={["24", "40"]} px="8">
      <Box textAlign="center">
        <Text
          as="span"
          fontSize={["4xl", "5xl"]}
          fontWeight="bold"
          bgGradient="linear(to-l, #FF00E5, #00C8FF)"
          bgClip="text"
        >
          {" "}
          Lyra Documentation{" "}
        </Text>
      </Box>
      <Flex direction={["column", "row"]} mt={["12", "20"]} gap="10">
        {sections.map((section) => (
          <Box key={section}>
            <Text
              as="h2"
              fontSize="2xl"
              fontWeight="bold"
              textTransform="capitalize"
              mb="5"
            >
              {" "}
              {section}{" "}
            </Text>
            <Stack spacing="4">
              {posts[section].docs.map((post) => (
                <Link href={post.slug} key={post.slug} passHref>
                  <Text as="a">
                    <Box
                      p="4"
                      bgColor="gray.900"
                      rounded="lg"
                      transition="ease 0.3s"
                      _hover={{ shadow: "dark-lg", bgColor: "gray.800" }}
                    >
                      <Text as="h2" fontWeight="semibold">
                        {post.data.title}
                      </Text>
                      <Text as="p" color="gray.500">
                        {post.data.description}
                      </Text>
                    </Box>
                  </Text>
                </Link>
              ))}
            </Stack>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
