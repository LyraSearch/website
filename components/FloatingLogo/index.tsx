import { Box, Image } from "@chakra-ui/react";

export function FloatingLogo() {
  return (
    <Box display="flex" justifyContent="flex-end" w="full" h="full">
      <Box pos="relative" display="flex" w="lg" h="80">
        <Image
          src="/logo/lyra-shadowed.svg"
          w="48"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          pos="absolute"
        />
        <Image
          src="/misc/supported-runtimes.svg"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="lg"
        />
      </Box>
    </Box>
  );
}
