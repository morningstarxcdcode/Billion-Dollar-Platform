import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
      // No toast due to missing useToast
    } catch (error) {
      // No toast due to missing useToast
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Login</Text>
          <Box as="div" mb={4}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box as="div" mb={4}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
