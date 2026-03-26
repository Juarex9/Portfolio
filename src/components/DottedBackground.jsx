import { Box, useColorModeValue } from "@chakra-ui/react";

export function DottedBackground({ children, ...props }) {
  const bgColor = useColorModeValue("#f4f5f7", "#111111");
  const dotColor = useColorModeValue("rgba(0, 0, 0, 0.03)", "rgba(255, 255, 255, 0.03)");

  return (
    <Box
      position="relative"
      {...props}
    >
      <Box
        position="absolute"
        inset={0}
        bgImage={`radial-gradient(${dotColor} 1px, transparent 1px)`}
        bgSize={{ base: "16px 16px", md: "20px 20px" }}
        zIndex={0}
      />
      <Box position="relative" zIndex={1} bg={bgColor}>
        {children}
      </Box>
    </Box>
  );
}