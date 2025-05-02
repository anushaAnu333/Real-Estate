// pages/search.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Center,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
  const router = useRouter();
  const accent = useColorModeValue('teal.500', 'teal.300');

  const removeFilter = (name) => {
    const { [name]: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest });
  };

  return (
    <Box mx="auto" px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'flex-start' }}
        gap={{ base: 4, md: 6 }}
      >
        {/* ─────── Sidebar ───────────────────── */}
        <Box
          flexShrink={0}
          w={{ base: 'full', md: '230px' }}
          bg={useColorModeValue('white', 'gray.700')}
          p={4}
         
        >
       
          <SearchFilters />
        </Box>

        {/* ─────── Main Content ───────────────── */}
        <Box flex="1">
          {/* Active Filters */}
          {Object.entries(router.query)
            .filter(([key, value]) => key !== 'page' && value)
            .length > 0 && (
            <Wrap spacing={2} mb={6} justify={{ base: 'center', md: 'flex-start' }}>
              {Object.entries(router.query)
                .filter(([key, value]) => key !== 'page' && value)
                .map(([key, value]) => (
                  <WrapItem key={key}>
                    <Tag size="md" variant="subtle" colorScheme="teal">
                      <TagLabel>{`${key}: ${value}`}</TagLabel>
                      <TagCloseButton onClick={() => removeFilter(key)} />
                    </Tag>
                  </WrapItem>
                ))}
            </Wrap>
          )}

          {/* Results Header */}
          <Heading
            as="h2"
            size="lg"
            mb={4}
            color={accent}
            textTransform="capitalize"
            textAlign="center"
          >
            Properties {router.query.purpose?.replace('-', ' ') || 'for rent'}
          </Heading>

          {/* Property Grid */}
          {properties.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
              {properties.map((property) => (
                <Property key={property.id} property={property} />
              ))}
            </SimpleGrid>
          ) : (
            <Center flexDir="column" mt={10}>
              <Image src={noresult} alt="No results" width={200} height={200} />
              <Text fontSize="xl" mt={4} color="gray.500">
                No Properties Found
              </Text>
            </Center>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const {
    purpose = 'for-rent',
    rentFrequency = 'yearly',
    minPrice = '0',
    maxPrice = '1000000',
    roomsMin = '0',
    bathsMin = '0',
    sort = 'price-desc',
    areaMax = '35000',
    locationExternalIDs = '5002',
    categoryExternalID = '4',
    search = '',
  } = query;

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}` +
      `&purpose=${purpose}&categoryExternalID=${categoryExternalID}` +
      `&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}` +
      `&priceMin=${minPrice}&priceMax=${maxPrice}` +
      `&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}` +
      `&search=${search}`
  );

  return {
    props: {
      properties: data?.hits || [],
    },
  };
}

export default Search;