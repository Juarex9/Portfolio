import {
  Container, Flex, Box, Heading, Text, IconButton, Button, VStack,
  HStack, Wrap, WrapItem, FormControl, FormLabel, Input, InputGroup,
  InputLeftElement, Textarea, useToast
} from '@chakra-ui/react'
import { MdPhone, MdEmail, MdLocationOn, MdFacebook, MdOutlineEmail } from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
import { useState } from 'react'
import { useAccentColors } from '../hooks/useAccentColors'

export default function Contact() {
  const { accentColor, bgColor, textColor, cardBg } = useAccentColors()
  const toast = useToast()

  // Estado del form
  const [form, setForm] = useState({ name: '', email: '', message: '', hp: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const resetForm = () => setForm({ name: '', email: '', message: '', hp: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honeypot: form.hp,       // campo oculto anti-spam
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.message || 'Error al enviar')
      toast({ title: 'Mensaje enviado', status: 'success' })
      resetForm()
    } catch (err) {
      toast({ title: 'Ups', description: err.message, status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width:'100%', height:'100%', overflow:'hidden' }}>
      <Container
        bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`}
        maxW="full" minH="100vh" p={10}
      >
        <Flex justify="center">
          <Box
            bg={cardBg} color={textColor} borderRadius="lg"
            boxShadow="0 8px 22px rgba(0,0,0,0.13)"
            m={{ sm: 4, md: 16, lg: 10 }} p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 10, lg: 20 }}>
                {/* Columna izquierda */}
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color={textColor}>
                      Fill up the form below to contact
                    </Text>

                    <Box py={{ base: 5, md: 8, lg: 10 }}>
                      <VStack spacing={3} align="flex-start">
                        <Button size="md" h="48px" w="220px" justifyContent="flex-start"
                          variant="ghost" color={textColor}
                          _hover={{ border: '2px solid #4ade80' }}
                          leftIcon={<MdPhone color={accentColor} size="20px" />}>
                          +54 9 3886672774
                        </Button>
                        <Button size="md" h="48px" w="220px" justifyContent="flex-start"
                          variant="ghost" color={textColor}
                          _hover={{ border: '2px solid #4ade80' }}
                          leftIcon={<MdEmail color={accentColor} size="20px" />}>
                          agustinjuarez375@gmail.com
                        </Button>
                        <Button size="md" h="48px" w="220px" justifyContent="flex-start"
                          variant="ghost" color={textColor}
                          _hover={{ border: '2px solid #4ade80' }}
                          leftIcon={<MdLocationOn color={accentColor} size="20px" />}>
                          Salta, Argentina
                        </Button>
                      </VStack>
                    </Box>

                    <HStack mt={{ lg: 10 }} spacing={5} px={1} align="flex-start">
                      <IconButton aria-label="facebook" variant="ghost" size="lg" isRound _hover={{ bg: accentColor }} icon={<MdFacebook size="28px" />} />
                      <IconButton aria-label="github"   variant="ghost" size="lg" isRound _hover={{ bg: accentColor }} icon={<BsGithub size="28px" />} />
                      <IconButton aria-label="discord"  variant="ghost" size="lg" isRound _hover={{ bg: accentColor }} icon={<BsDiscord size="28px" />} />
                    </HStack>
                  </Box>
                </WrapItem>

                {/* Columna derecha (FORM) */}
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <form onSubmit={onSubmit}>
                        <VStack spacing={5} align="stretch">
                          {/* honeypot oculto */}
                          <Input
                            type="text" name="hp" value={form.hp} onChange={onChange}
                            display="none" aria-hidden="true" tabIndex={-1}
                            autoComplete="off"
                          />

                          <FormControl id="name" isRequired>
                            <FormLabel>Your Name</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <BsPerson color="gray.800" />
                              </InputLeftElement>
                              <Input
                                type="text" size="md"
                                name="name" value={form.name} onChange={onChange}
                                placeholder="Your name"
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl id="email" isRequired>
                            <FormLabel>Mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <MdOutlineEmail color="gray.800" />
                              </InputLeftElement>
                              <Input
                                type="email" size="md"
                                name="email" value={form.email} onChange={onChange}
                                placeholder="you@mail.com"
                              />
                            </InputGroup>
                          </FormControl>

                          <FormControl id="message" isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                              name="message" value={form.message} onChange={onChange}
                              borderColor="gray.300" placeholder="Message"
                            />
                          </FormControl>

                          <FormControl float="right">
                            <Button
                              type="submit" variant="solid" bg="black" color="white"
                              _hover={{ bg: 'blackAlpha.800' }} isLoading={loading}
                            >
                              Send Message
                            </Button>
                          </FormControl>
                        </VStack>
                      </form>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}
