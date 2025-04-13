import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8732/api/users/login', formData);
      console.log('Login response:', response.data); // Debug
      if (response.data && response.data.id && response.data.role) {
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Login successful!');
        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Login;
