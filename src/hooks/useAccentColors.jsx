import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
    const accentColor = useColorModeValue("#3a5728e1", "#4ade80")
    const bgColor = useColorModeValue("#f7fafc", "#000000ff");
    const textColor = useColorModeValue("#000000ff", "#fff");
    const cardBg = useColorModeValue("#fff", "#232d25");
    const cardText = useColorModeValue("#000000ff", "#fff");
    return { accentColor, cardBg, cardText, bgColor, textColor };
}