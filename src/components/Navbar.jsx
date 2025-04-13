import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      console.log("Navbar: Stored user:", storedUser);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log("Navbar: Set user:", parsedUser);
        } catch (error) {
          console.error("Navbar: Error parsing user:", error);
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Check Credit Score", path: "/credit-score" },
    ...(user
      ? [
          { label: "Apply for Loan", path: "/apply-loan" },
          {
            label: user.role === "ADMIN" ? "Admin Dashboard" : "My Dashboard",
            path: "/dashboard",
          },
        ]
      : [
          { label: "Register", path: "/register" },
          { label: "Login", path: "/login" },
        ]),
  ];

  const drawer = (
    <Box sx={{ p: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            SundaramProLoan
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ mx: 1 }}
              >
                {item.label}
              </Button>
            ))}
            {user && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawer}
      </Drawer>
    </motion.div>
  );
}

export default Navbar;
