import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
  Chip,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Person,
  Work,
  Home,
  AttachMoney,
  Score,
  AssignmentTurnedIn,
} from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Prepare data for charts
  const getStatusData = () => {
    const statusCounts = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0 }
    );
    return [
      { name: "Pending", value: statusCounts.PENDING, color: "#FFC107" },
      { name: "Approved", value: statusCounts.APPROVED, color: "#4CAF50" },
      { name: "Rejected", value: statusCounts.REJECTED, color: "#F44336" },
    ].filter((item) => item.value > 0);
  };

  const getPurposeData = () => {
    const purposeSums = applications.reduce((acc, app) => {
      acc[app.purpose] = (acc[app.purpose] || 0) + Number(app.loanAmount);
      return acc;
    }, {});
    return Object.keys(purposeSums).map((purpose) => ({
      purpose,
      amount: purposeSums[purpose],
    }));
  };

  useEffect(() => {
    console.log("Dashboard: User data:", user);
    if (!user.id || !user.role) {
      setError("User not logged in or invalid session");
      setLoading(false);
      toast.error("Please log in to view your dashboard");
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint =
        user.role === "ADMIN"
          ? "http://localhost:8732/api/loans/all"
          : `http://localhost:8732/api/loans/user/${user.id}`;
      console.log("Fetching from:", endpoint);
      const response = await axios.get(endpoint);
      console.log("API response:", response.data);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to load applications";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:8732/api/loans/update-status/${applicationId}`,
        null,
        { params: { status } }
      );
      toast.success(`Application ${status.toLowerCase()}!`);
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const handleDisburse = async (applicationId) => {
    try {
      const application = applications.find(
        (app) => app.applicationId === applicationId
      );
      await axios.post(
        `http://localhost:8732/api/disbursements/disburse/${applicationId}`,
        null,
        { params: { amount: application.loanAmount } }
      );
      toast.success("Loan disbursed!");
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Disbursement failed");
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <LinearProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Oops, something went wrong!
        </Typography>
        <Typography variant="body1">
          {typeof error === "string"
            ? error
            : "An error occurred while loading the dashboard"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={fetchApplications}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#1e3a8a",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            {user.role === "ADMIN" ? "Admin Control Center" : "My Loan Hub"}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {user.role === "ADMIN"
              ? "Manage all loan applications with ease"
              : "Track and manage your loan applications"}
          </Typography>
        </motion.div>

        {/* Charts Section */}
        {applications.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Pie Chart: Status Distribution */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "medium", color: "#1e3a8a" }}
                  >
                    Application Status
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <PieChart width={400} height={250}>
                      <Pie
                        data={getStatusData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                      >
                        {getStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Bar Chart: Loan Amount by Purpose */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "medium", color: "#1e3a8a" }}
                  >
                    Loan Amounts by Purpose
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getPurposeData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="purpose" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        )}

        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "medium", color: "#1e3a8a", mb: 2 }}
          >
            {applications.length} Application
            {applications.length === 1 ? "" : "s"}
          </Typography>
          {applications.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                background: "#ffffff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {user.role === "ADMIN"
                  ? "No applications available."
                  : "You have not applied for any loans yet."}
              </Typography>
              {user.role !== "ADMIN" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  href="/apply-loan"
                >
                  Apply Now
                </Button>
              )}
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {applications.map((app) => (
                <Grid item xs={12} sm={6} md={4} key={app.applicationId}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        background:
                          "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                        transition: "all 0.3s",
                        "&:hover": {
                          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#1e3a8a" }}
                          >
                            ID: {app.applicationId.slice(0, 8)}...
                          </Typography>
                          <Chip
                            label={app.status}
                            color={
                              app.status === "APPROVED"
                                ? "success"
                                : app.status === "REJECTED"
                                ? "error"
                                : "warning"
                            }
                            size="small"
                          />
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Person sx={{ mr: 1, color: "#3b82f6" }} />
                          <Typography>
                            <strong>Name:</strong> {app.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Work sx={{ mr: 1, color: "#3b82f6" }} />
                          <Typography>
                            <strong>Profession:</strong> {app.profession}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Home sx={{ mr: 1, color: "#3b82f6" }} />
                          <Typography>
                            <strong>Purpose:</strong> {app.purpose}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <AttachMoney sx={{ mr: 1, color: "#3b82f6" }} />
                          <Typography>
                            <strong>Amount:</strong> $
                            {Number(app.loanAmount).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Score sx={{ mr: 1, color: "#3b82f6" }} />
                          <Typography>
                            <strong>Credit Score:</strong> {app.creditScore}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AssignmentTurnedIn
                            sx={{ mr: 1, color: "#3b82f6" }}
                          />
                          <Typography>
                            <strong>Status:</strong> {app.status}
                          </Typography>
                        </Box>
                        {user.role === "ADMIN" && app.status === "PENDING" && (
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() =>
                                handleStatusUpdate(
                                  app.applicationId,
                                  "APPROVED"
                                )
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() =>
                                handleStatusUpdate(
                                  app.applicationId,
                                  "REJECTED"
                                )
                              }
                              sx={{ borderRadius: 2 }}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                        {user.role === "ADMIN" && app.status === "APPROVED" && (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ mt: 2, borderRadius: 2, width: "100%" }}
                            onClick={() => handleDisburse(app.applicationId)}
                          >
                            Disburse Loan
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}

export default Dashboard;

