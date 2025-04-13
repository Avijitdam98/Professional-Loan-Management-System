import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero-image-1.png";

function Home() {
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  // EMI Calculation Function
  const calculateEmi = () => {
    const principal = loanAmount;
    const rateOfInterest = interestRate / 12 / 100;
    const tenureInMonths = loanTenure;

    const emi =
      (principal *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, tenureInMonths)) /
      (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);
    setEmi(emi.toFixed(2));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f7fb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Hero Section */}
      <Container
        sx={{
          py: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ color: "#002D62" }}>
                Trusted Financial Solutions
              </Typography>
              <Typography variant="h5" paragraph sx={{ color: "#444" }}>
                Simplifying your investment, loan, and financial journey with
                Sundaram Finance.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/credit-score"
                  sx={{
                    backgroundColor: "#F9B233",
                    color: "#002D62",
                    mr: 2,
                    "&:hover": { backgroundColor: "#e09e1f" },
                  }}
                >
                  Check Credit Score
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    borderColor: "#002D62",
                    color: "#002D62",
                    "&:hover": { backgroundColor: "#e6f0fa" },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 5, borderRadius: 2, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={HeroImage}
                  alt="Finance Illustration"
                />
              </Card>
            </Grid>
          </motion.div>
        </Grid>
      </Container>

      {/* EMI Calculator Section */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff", width: "100%" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "#002D62" }}
            >
              EMI Calculator
            </Typography>
          </motion.div>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#002D62" }}
                  >
                    Calculate Your EMI
                  </Typography>
                  <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <TextField
                      label="Loan Amount"
                      type="number"
                      variant="outlined"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <FormControl sx={{ mb: 2 }}>
                      <InputLabel>Interest Rate</InputLabel>
                      <Select
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        label="Interest Rate"
                      >
                        {[5, 6, 7, 8, 9, 10, 11, 12].map((rate) => (
                          <MenuItem key={rate} value={rate}>
                            {rate}%
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Loan Tenure (Months)"
                      type="number"
                      variant="outlined"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={calculateEmi}
                      sx={{ backgroundColor: "#F9B233", color: "#002D62" }}
                    >
                      Calculate EMI
                    </Button>
                  </Box>
                  {emi > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" sx={{ color: "#002D62" }}>
                        Your Estimated EMI: ₹{emi}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff", width: "100%" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "#002D62" }}
            >
              Why Sundaram Finance?
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {[
              {
                title: "Seamless Application",
                desc: "Apply online effortlessly with minimal documentation.",
              },
              {
                title: "Quick & Transparent Processing",
                desc: "Fair, clear, and swift loan processing.",
              },
              {
                title: "Trusted Legacy",
                desc: "Decades of financial trust and customer satisfaction.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card sx={{ boxShadow: 4, borderRadius: 2, height: "100%" }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: "#002D62" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#555" }}>
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Eligibility Criteria */}
      <Box sx={{ py: 8, backgroundColor: "#f4f7fb", width: "100%" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "#002D62" }}
            >
              Eligibility Criteria
            </Typography>
          </motion.div>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "#002D62" }}
                    >
                      To apply for a loan, you must:
                    </Typography>
                    <Box
                      component="ul"
                      sx={{ listStyle: "none", pl: 0, mt: 2 }}
                    >
                      {[
                        "Be at least 21 years of age.",
                        "Have a stable and regular income source.",
                        "Possess a healthy credit history.",
                      ].map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon sx={{ color: "#F9B233" }} />
                          </ListItemIcon>
                          <Typography variant="body1" sx={{ color: "#444" }}>
                            {item}
                          </Typography>
                        </ListItem>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff", width: "100%" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "#002D62" }}
            >
              Frequently Asked Questions
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {[
              {
                title: "What is the interest rate?",
                desc: "Our loans are offered at a competitive 10.5% per annum, fixed for the entire tenure.",
              },
              {
                title: "What is the loan tenure?",
                desc: "You can choose from 12 to 60 months based on your convenience.",
              },
              {
                title: "What is the loan amount?",
                desc: "Loans range from ₹50,000 to ₹5,00,000 to suit your specific needs.",
              },
              {
                title: "Is there a processing fee?",
                desc: "Yes, a one-time non-refundable processing fee of 1% of the loan amount is applicable.",
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: "#002D62" }} />}
                      aria-controls={`panel₹{index + 1}-content`}
                      id={`panel₹{index + 1}-header`}
                    >
                      <Typography variant="h6" sx={{ color: "#002D62" }}>
                        {faq.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ color: "#444" }}>
                        {faq.desc}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
