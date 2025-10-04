import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="bg-white border-b border-gray-200"
    >
      <Toolbar className="container mx-auto flex items-center">
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          className="font-extrabold tracking-wide text-white no-underline flex-grow"
        >
          Bizzy Shop
        </Typography>
        <Box className="flex gap-2">
          <Button
            color="inherit"
            component={RouterLink}
            to="/products"
            className="hover:bg-blue-700 transition"
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/basket"
            startIcon={<ShoppingCartIcon />}
            className="hover:bg-blue-700 transition"
          >
            Basket
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
