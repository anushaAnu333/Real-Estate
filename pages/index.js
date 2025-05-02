import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => {
  const bgGradient = useColorModeValue('linear(to-r, blue.400, purple.500)', 'linear(to-r, blue.600, purple.700)');
  const textColor = useColorModeValue('white', 'gray.100');
  return (
    <Flex
      direction={['column-reverse', 'row']}
      align="center"
      justify="space-between"
      p={10}
      bgGradient={bgGradient}
      borderRadius="2xl"
      boxShadow="2xl"
      color={textColor}
      mb={12}
    >
      <Stack spacing={6} flex="1" textAlign={['center', 'left']}>
        <Text fontSize="sm" fontWeight="bold" letterSpacing="wide" textTransform="uppercase">
          {purpose}
        </Text>
        <Heading as="h2" size="2xl" lineHeight="shorter">
          {title1} <br /> {title2}
        </Heading>
        <Text fontSize="lg" maxW="lg" mx={['auto', 0]}>
          {desc1} <br /> {desc2}
        </Text>
        <Link href={linkName} passHref>
          <Button
            size="lg"
            bg="whiteAlpha.900"
            color="blue.600"
            _hover={{ bg: 'white', color: 'blue.500' }}
            alignSelf={['center', 'flex-start']}
          >
            {buttonText}
          </Button>
        </Link>
      </Stack>
      <Box flex="1" position="relative" w={['100%', '500px']} h="300px" borderRadius="xl" overflow="hidden">
        <Image
          src={imageUrl}
          alt="banner image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
    </Flex>
  );
};

const Home = ({ propertiesForSale, propertiesForRent }) => {
  const headingColor = useColorModeValue('teal.500', 'teal.500');
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  return (
    <Box maxW="7xl" mx="auto" p={5}>
      {/* Rental Banner */}
      <Banner
        purpose="Rent a Home"
        title1="Find Your Perfect"
        title2="Rental Property"
        desc1="Discover apartments, villas, and more"
        desc2="tailored to your needs."
        buttonText="Explore Rentals"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Box   borderRadius="lg" mb={12}>
        <Heading as="h3" size="lg" color={headingColor} mb={6}>
          Rental Properties
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Sale Banner */}
      <Banner
        purpose="Buy a Home"
        title1="Your Dream Home"
        title2="Awaits You"
        desc1="Explore luxurious apartments, villas,"
        desc2="and more to call your own."
        buttonText="Explore Sales"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Box >
        <Heading as="h3" size="lg" color={headingColor} mb={6}>
          Properties for Sale
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {propertiesForSale.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
