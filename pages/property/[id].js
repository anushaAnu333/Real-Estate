import {
  Box,
  Flex,
  Grid,
  Text,
  Icon,
  Avatar,
  Badge,
  Tag,
  TagLabel,
  SimpleGrid,
  Divider,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import ImageScrollbar from '../../components/ImageScrollbar';
import { baseUrl, fetchApi } from '../../utils/fetchApi';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const badgeColor = useColorModeValue('green.500', 'green.300');

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      {/* Image Section */}
      <Box mb={8} borderRadius="lg" overflow="hidden" boxShadow="lg">
        <ImageScrollbar data={photos} />
      </Box>

      {/* Main Content */}
      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8}>
        {/* Left Section */}
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
              AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
            </Text>
            <Avatar size="lg" src={agency?.logo?.url} name={agency?.name} />
          </Flex>

          <HStack spacing={6} color={accentColor} fontSize="lg" mb={4}>
            <Flex align="center">
              <Icon as={FaBed} mr={2} />
              <Text>{rooms} Beds</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaBath} mr={2} />
              <Text>{baths} Baths</Text>
            </Flex>
            <Flex align="center">
              <Icon as={BsGridFill} mr={2} />
              <Text>{millify(area)} sqft</Text>
            </Flex>
          </HStack>

          <Divider my={4} />

          <Text fontSize="xl" fontWeight="semibold" color={textColor} mb={4}>
            {title}
          </Text>

          <Text lineHeight="1.8" color={textColor}>
            {description}
          </Text>
        </Box>

        {/* Right Section */}
        <VStack spacing={6} align="stretch">
          {/* Property Info */}
          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
              Property Details
            </Text>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="semibold">Type:</Text>
                <Text>{type}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="semibold">Purpose:</Text>
                <Text>{purpose}</Text>
              </Flex>
              {furnishingStatus && (
                <Flex justify="space-between">
                  <Text fontWeight="semibold">Furnishing:</Text>
                  <Text>{furnishingStatus}</Text>
                </Flex>
              )}
            </VStack>
          </Box>

          {/* Amenities */}
          <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={4} color={accentColor}>
              Amenities
            </Text>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
  {amenities.map((group, groupIndex) =>
    group.amenities.map((amenity, amenityIndex) => (
      <Tag
        size="lg"
        key={`${groupIndex}-${amenityIndex}`} // Ensure unique key
        variant="solid"
        colorScheme="blue"
        borderRadius="full"
        px={4}
        py={2}
        whiteSpace="normal"
      >
        <TagLabel>{amenity.text}</TagLabel>
      </Tag>
    ))
  )}
</SimpleGrid>
          </Box>
        </VStack>
      </Grid>

      {/* Call to Action */}
      <Box mt={8} textAlign="center">
        <Button
          size="lg"
          colorScheme="blue"
          boxShadow="lg"
          px={8}
          py={6}
          fontSize="xl"
        >
          Contact Agent
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}