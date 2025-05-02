import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Button,
  useColorMode,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import { BsMoon, BsSun } from 'react-icons/bs';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const navColor = useColorModeValue('blue.600', 'teal.300');
  const linkHoverColor = useColorModeValue('blue.500', 'teal.200');
  const buttonBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bg} px={6} py={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Brand Logo/Name */}
        <Box fontSize="2xl" fontWeight="extrabold" color={navColor}>
          <Link href="/">Real Estate</Link>
        </Box>

        {/* Add Spacer for Gap */}
        <Spacer />

        {/* Desktop Links */}
        <HStack as="nav" spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link href="/" passHref>
            <Box
              fontSize="lg"
              fontWeight="medium"
              _hover={{ color: linkHoverColor }}
              cursor="pointer"
            >
              Home
            </Box>
          </Link>
          <Link href="/search" passHref>
            <Box
              fontSize="lg"
              fontWeight="medium"
              _hover={{ color: linkHoverColor }}
              cursor="pointer"
            >
              Search
            </Box>
          </Link>
          <Link href="/search?purpose=for-sale" passHref>
            <Box
              fontSize="lg"
              fontWeight="medium"
              _hover={{ color: linkHoverColor }}
              cursor="pointer"
            >
              Buy
            </Box>
          </Link>
          <Link href="/search?purpose=for-rent" passHref>
            <Box
              fontSize="lg"
              fontWeight="medium"
              _hover={{ color: linkHoverColor }}
              cursor="pointer"
            >
              Rent
            </Box>
          </Link>
        </HStack>

        {/* Mobile Menu */}
        <Box display={{ base: 'flex', md: 'none' }}>
          <Button
            as="a"
            href="/search"
            size="sm"
            bg={buttonBg}
            _hover={{ bg: linkHoverColor, color: 'white' }}
          >
            Menu
          </Button>
        </Box>

        {/* Color Mode Toggle */}
        <Spacer />
        <Button
          size="sm"
          onClick={toggleColorMode}
          bg={buttonBg}
          _hover={{ bg: linkHoverColor, color: 'white' }}
        >
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;