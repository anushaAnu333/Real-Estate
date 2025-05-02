import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import DefaultImage from '../assets/images/house.jpg';

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  // Use color mode for light/dark compatibility
  const bgGradient = useColorModeValue(
    'linear(to-b, white, gray.100)',
    'linear(to-b, gray.800, gray.900)'
  );
  const hoverBgGradient = useColorModeValue(
    'linear(to-b, gray.100, gray.200)',
    'linear(to-b, gray.700, gray.800)'
  );
  const textColor = useColorModeValue('gray.800', 'white');
  const priceColor = useColorModeValue('teal.600', 'teal.300');
  const detailIconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Link href={`/property/${externalID}`} passHref>
      <Box
        as="a"
        maxW="300px"
        w="full"
        bgGradient={bgGradient}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
       
        transition="all 0.3s ease-in-out"
        cursor="pointer"
        m={4}
      >
        {/* Image Section */}
        <Box position="relative" h="250px" w="full">
          <Image
            src={coverPhoto?.url || DefaultImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            style={{ transition: 'transform 0.5s ease' }}
            _hover={{ transform: 'scale(1.1)' }}
          />
        </Box>

        {/* Content Section */}
        <Box p={5}>
          {/* Price and Agency */}
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center">
              {isVerified && (
                <Icon as={GoVerified} w={5} h={5} color="green.400" mr={2} />
              )}
              <Text fontSize="lg" fontWeight="bold" color={priceColor}>
                AED {millify(price)}
                {rentFrequency && (
                  <Text as="span" color="gray.500" fontSize="sm">
                    /{rentFrequency}
                  </Text>
                )}
              </Text>
            </Flex>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Flex>

          {/* Property Details */}
          <Flex justify="space-between" direction="column"  color={priceColor} fontSize="sm" mb={4}>
            <Flex align="center">
              <Icon as={FaBed} mr={1} />
              <Text>{rooms} Beds</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaBath} mr={1} />
              <Text>{baths} Baths</Text>
            </Flex>
            <Flex align="center">
              <Icon as={BsGridFill} mr={1} />
              <Text>{millify(area)} sqft</Text>
            </Flex>
          </Flex>

          {/* Title */}
          <Text
            fontSize="md"
            fontWeight="medium"
            color={textColor}
            noOfLines={2}
          >
            {title}
          </Text>
        </Box>

        {/* Footer Section */}
        <Box
          bg={useColorModeValue('gray.100', 'gray.700')}
          p={3}
          textAlign="center"
          borderTop="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Text fontSize="sm" color={textColor}>
            Click to view more details
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default Property;