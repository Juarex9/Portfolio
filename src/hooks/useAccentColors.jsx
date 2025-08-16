import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
    const accentColor = useColorModeValue("#29411ae3", "#4ade80")
    const bgColor = useColorModeValue("#c5ccd1ff", "#000000ff");
    const textColor = useColorModeValue("#000000ff", "#fff");
    const cardBg = useColorModeValue("#d9dfe4e0", "#232d25");
    const cardText = useColorModeValue("#000000ff", "#fff");
    return { accentColor, cardBg, cardText, bgColor, textColor };
}