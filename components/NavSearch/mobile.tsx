import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { search, SearchResult, formatNanoseconds } from "@lyrasearch/lyra";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const db = require("../../lyra/db.json");

export const NavSearchMobile = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Array<SearchResult<any>>>([]);
  const [elapsed, setElapsed] = useState("");
  const [number, setNumber] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setTerm("");
    setResults([]);
    setElapsed("");
    setNumber(0);
  }, [router.asPath]);

  useEffect(() => {
    const searchResults = search(db, {
      term,
      limit: 5,
      tolerance: 1,
      properties: ["title", "description", "content"],
    });

    // @ts-expect-error
    setResults(searchResults.hits);
    if (searchResults.hits.length > 0) {
      setShowResultsPopup(true);
    }
    setElapsed(formatNanoseconds(searchResults.elapsed));
    setNumber(searchResults.count);
  }, [term]);

  const readyResults = results.map((result) => {
    const { content, ...rest } = result as any;

    return {
      ...rest,
      content: content.slice(
        content.indexOf(term),
        content.indexOf(term) + 100
      ),
    };
  });

  const [showResultsPopup, setShowResultsPopup] = useState(false);

  const popupRef = useRef(null);
  useOutsideClick({
    ref: popupRef,
    handler: () => {
      setShowResultsPopup(false);
      setTerm("");
    },
  });

  return (
    <Box>
      {showResultsPopup ? (
        <CloseIcon
          color="gray.200"
          onClick={() => setShowResultsPopup(false)}
        />
      ) : (
        <SearchIcon
          color="gray.200"
          onClick={() => setShowResultsPopup(true)}
        />
      )}

      {/* TODO: Prevent page scroll while popup is open */}

      {showResultsPopup && (
        <Box
          ref={popupRef}
          label="popup"
          pos="absolute"
          top="20"
          left="0"
          w={["sm", "container.sm"]}
          /* bg="gray.900" */
          bg="pink.700"
          rounded="md"
          shadow="dark-lg"
          px="4"
        >
          <Box bg="pink.400" mb="4">
            <InputGroup>
              <InputLeftElement
                h="8"
                pointerEvents="none"
                children={<SearchIcon color="gray.200" />}
              />
              <Input
                autoFocus={true}
                colorScheme="whiteAlpha"
                size="sm"
                placeholder="Search in Docs"
                rounded="md"
                _placeholder={{
                  color: "whiteAlpha.700",
                }}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </InputGroup>
          </Box>

          {readyResults.map((result: any) => (
            <Link href={result.slug} passHref key={result.id}>
              <a>
                <Box
                  mb="2"
                  bg="gray.800"
                  p="2"
                  rounded="md"
                  _hover={{ bg: "gray.700" }}
                  transition="ease 0.3s"
                >
                  <Text fontWeight="semibold">{result.title}</Text>
                  <Text>
                    ...
                    <Text
                      as="span"
                      dangerouslySetInnerHTML={{ __html: result.content }}
                    />
                    ...
                  </Text>
                </Box>
              </a>
            </Link>
          ))}

          <Box textAlign="center" fontSize="sm">
            {number} total results in {elapsed} thanks to Lyra
          </Box>
        </Box>
      )}
    </Box>
  );
};
