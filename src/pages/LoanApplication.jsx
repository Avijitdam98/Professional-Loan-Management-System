import {
  Box,
  Button,
  Container,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoanApplication() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    purpose: "",
    loanAmount: "",
    creditScore: "",
  });
  const [files, setFiles] = useState({ pfAccountPdf: null, salarySlip: null });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("profession", formData.profession);
    data.append("purpose", formData.purpose);
    data.append("loanAmount", formData.loanAmount);
    data.append("creditScore", formData.creditScore);
    data.append("userId", user.id);
    data.append("pfAccountPdf", files.pfAccountPdf);
    data.append("salarySlip", files.salarySlip);

    try {
      console.log("Submitting loan application...");
      const response = await axios.post(
        "http://localhost:8732/api/loans/apply",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Loan application response:", response.data);
      toast.success(
        "Loan application submitted! Status: " + response.data.status
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Loan application error:", error);
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  if (!user.id) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Please log in to apply for a loan.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 4,
              background: "#ffffff",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#0d47a1",
                mb: 3,
              }}
            >
              Apply for a Loan
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Loan Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Loan Amount (₹)"
                name="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ min: 1000 }}
              />
              <TextField
                fullWidth
                label="Credit Score"
                name="creditScore"
                type="number"
                value={formData.creditScore}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ min: 300, max: 850 }}
              />
              <FormHelperText sx={{ mb: 2, color: "warning.main" }}>
                * Scores below 600 may be automatically rejected.
              </FormHelperText>

              <InputLabel
                htmlFor="pfAccountPdf"
                sx={{ mt: 2, fontWeight: 500 }}
              >
                PF Account PDF
              </InputLabel>
              <TextField
                fullWidth
                type="file"
                name="pfAccountPdf"
                inputProps={{ accept: ".pdf" }}
                onChange={handleFileChange}
                margin="normal"
                required
              />

              <InputLabel htmlFor="salarySlip" sx={{ mt: 2, fontWeight: 500 }}>
                Salary Slip PDF
              </InputLabel>
              <TextField
                fullWidth
                type="file"
                name="salarySlip"
                inputProps={{ accept: ".pdf" }}
                onChange={handleFileChange}
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.5,
                  backgroundColor: "#0d47a1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#0b3c91",
                  },
                }}
              >
                Submit Application
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default LoanApplication;
