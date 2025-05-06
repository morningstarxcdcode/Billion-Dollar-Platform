import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box maxW="4xl" mx="auto" mt={8} p={4}>
      <VStack spacing={6} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg">Welcome, {user?.name}!</Heading>
          <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Logout
          </Button>
        </Flex>
        
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>Profile Information</Heading>
          <Text><strong>Name:</strong> {user?.name}</Text>
          <Text><strong>Email:</strong> {user?.email}</Text>
        </Box>
      </VStack>
    </Box>
  );
}