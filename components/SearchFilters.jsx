import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Button,
  Spinner,
  Text,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { MdCancel, MdArrowDropDown } from "react-icons/md";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchProperties = (filterValues = {}) => {
    const { pathname, query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value) query[item.name] = item.value;
      else delete query[item.name];
    });
    router.push({ pathname, query });
  };

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`)
      .then((data) => setLocationData(data?.hits || []))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const bg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box>
      {/* Hamburger Button for Mobile */}
      <Button
        display={{ base: "block", md: "none" }}
        colorScheme="teal"
        onClick={onOpen}
        mb={4}
      >
        Filters
      </Button>

      {/* Drawer for Mobile Filters */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {/* Filter Menus */}
              {filters.map((filter) => (
                <Menu key={filter.queryName} isLazy>
                  <MenuButton
                    as={Button}
                    rightIcon={<MdArrowDropDown />}
                    variant="outline"
                    w="100%"
                    bg={cardBg}
                  >
                    {router.query[filter.queryName] || filter.placeholder}
                  </MenuButton>
                  <MenuList bg={cardBg} boxShadow="lg" borderRadius="md">
                    {filter.items.map((item) => (
                      <MenuItem
                        key={item.value}
                        onClick={() =>
                          searchProperties({ [filter.queryName]: item.value })
                        }
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ))}

              {/* Location Search */}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color={useColorModeValue("gray.500", "gray.400")} />
                </InputLeftElement>
                <Input
                  placeholder="Search location"
                  value={searchTerm}
                  onFocus={() => setShowLocations(true)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="filled"
                  bg={cardBg}
                  borderRadius="md"
                />
                {searchTerm && (
                  <IconButton
                    aria-label="Clear search"
                    icon={<MdCancel />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setSearchTerm("")}
                    position="absolute"
                    right="8px"
                    top="50%"
                    transform="translateY(-50%)"
                  />
                )}
              </InputGroup>

              {showLocations && (
                <Box
                  mt={2}
                  bg={cardBg}
                  borderRadius="md"
                  boxShadow="lg"
                  maxH="200px"
                  overflowY="auto"
                >
                  {loading ? (
                    <Flex justify="center" p={3}>
                      <Spinner />
                    </Flex>
                  ) : (
                    locationData.map((loc) => (
                      <Box
                        key={loc.id}
                        onClick={() => {
                          searchProperties({
                            locationExternalIDs: loc.externalID,
                          });
                          setShowLocations(false);
                          setSearchTerm(loc.name);
                        }}
                        p={3}
                        cursor="pointer"
                        _hover={{
                          bg: useColorModeValue("gray.100", "gray.600"),
                        }}
                      >
                        <Text>{loc.name}</Text>
                      </Box>
                    ))
                  )}
                </Box>
              )}

              {/* Action Buttons */}
              <HStack
                spacing={3}
                justifyContent="center"
                pt={4}
                borderTop="1px"
                borderColor={useColorModeValue("gray.200", "gray.600")}
              >
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    searchProperties(router.query);
                    onClose();
                  }}
                >
                  Apply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    searchProperties({});
                    onClose();
                  }}
                >
                  Reset
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop Filters */}
      <Box
        display={{ base: "none", md: "block" }}
        borderRadius="xl"
        bg={bg}
        p={4}
        boxShadow="md"
      >
        <VStack spacing={4} align="stretch">
          {/* Filter Menus */}
          {filters.map((filter) => (
            <Menu key={filter.queryName} isLazy>
              <MenuButton
                as={Button}
                rightIcon={<MdArrowDropDown />}
                variant="outline"
                w="100%"
                bg={cardBg}
              >
                {router.query[filter.queryName] || filter.placeholder}
              </MenuButton>
              <MenuList bg={cardBg} boxShadow="lg" borderRadius="md">
                {filter.items.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() =>
                      searchProperties({ [filter.queryName]: item.value })
                    }
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}

          {/* Location Search */}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color={useColorModeValue("gray.500", "gray.400")} />
            </InputLeftElement>
            <Input
              placeholder="Search location"
              value={searchTerm}
              onFocus={() => setShowLocations(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              bg={cardBg}
              borderRadius="md"
            />
            {searchTerm && (
              <IconButton
                aria-label="Clear search"
                icon={<MdCancel />}
                size="sm"
                variant="ghost"
                onClick={() => setSearchTerm("")}
                position="absolute"
                right="8px"
                top="50%"
                transform="translateY(-50%)"
              />
            )}
          </InputGroup>

          {showLocations && (
            <Box
              mt={2}
              bg={cardBg}
              borderRadius="md"
              boxShadow="lg"
              maxH="200px"
              overflowY="auto"
            >
              {loading ? (
                <Flex justify="center" p={3}>
                  <Spinner />
                </Flex>
              ) : (
                locationData.map((loc) => (
                  <Box
                    key={loc.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: loc.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(loc.name);
                    }}
                    p={3}
                    cursor="pointer"
                    _hover={{
                      bg: useColorModeValue("gray.100", "gray.600"),
                    }}
                  >
                    <Text>{loc.name}</Text>
                  </Box>
                ))
              )}
            </Box>
          )}

          {/* Action Buttons */}
          <HStack
            spacing={3}
            justifyContent="center"
            pt={4}
            borderTop="1px"
            borderColor={useColorModeValue("gray.200", "gray.600")}
          >
            <Button colorScheme="teal" onClick={() => searchProperties(router.query)}>
              Apply
            </Button>
            <Button variant="outline" onClick={() => searchProperties({})}>
              Reset
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
