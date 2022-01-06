import { Badge, Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useGetQuizzes } from '../gql/queries/backend/getQuizzes'

const Home: NextPage = () => {
  const { data, loading, error } = useGetQuizzes()


  if (loading) return <p>Loading...</p>

  return (
    <Box p={10}>
      <Heading mb={5}>
        AniQuiz
      </Heading>
      {
      data?.quizzes?.data.map(quiz => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" key={quiz.id}>
          <Image
            alt="Quiz Cover Image"
            width={quiz.attributes?.coverImage.data?.attributes?.width ?? '100px'}
            height={quiz.attributes?.coverImage.data?.attributes?.height ?? '100px'}
            src={`${process.env.NEXT_PUBLIC_ASSET_ENDPOINT}${quiz.attributes?.coverImage.data?.attributes?.url}`}
          />
          <VStack spacing={2} align="flex-start" p={2}>
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="purple">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {quiz.attributes?.difficulty?.difficulty} &bull; {quiz.attributes?.length} question{quiz.attributes!.length > 1 ? 's' : ''}
              </Box>
            </Box>
            <Heading size="md">{quiz.attributes?.Title}</Heading>
            <Text>{quiz.attributes?.description}</Text>
            <Button colorScheme="purple" isFullWidth>
              Play Now
            </Button>
          </VStack>
        </Box>
      ))
    }
    </Box>
  )
}

export default Home
