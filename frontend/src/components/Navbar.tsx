import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { useBasket } from "../context/BasketContext";

export default function Navbar() {
  const { basket } = useBasket();

  const count = basket.items.reduce((sum, item) => sum + item.quantity, 0);

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
          <svg
            width="110"
            height="32"
            viewBox="0 0 110 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="25"
              font-family="Montserrat, Arial, sans-serif"
              font-weight="bold"
              font-size="32"
              fill="#FFFFFF"
            >
              bizzy.
            </text>
          </svg>
        </Typography>
        <Box className="flex gap-2">
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin/discount-rules"
            className="hover:bg-blue-700 transition"
          >
            discount Rules
          </Button>
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
            className="hover:bg-blue-700 transition"
          >
            <Badge
              badgeContent={count}
              color="secondary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              showZero={false} // hide badge when 0
              max={99}
            >
              <ShoppingCartIcon />
            </Badge>
            &nbsp;Basket
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
