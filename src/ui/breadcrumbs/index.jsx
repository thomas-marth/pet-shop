import { Fragment } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const buttonSx = {
  color: "#8B8B8B",
  borderColor: "#DDD",
  padding: "8px 16px",
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: 1.3,
  textTransform: "none",
  borderRadius: "6px",
  transition: "all 0.3s",
  "&:hover": {
    color: "#8B8B8B",
    backgroundColor: "#F1F3F4",
  },
};

const Divider = () => (
  <Box
    sx={{
      height: "1px",
      width: "16px",
      backgroundColor: "#DDD",
    }}
  />
);

const BreadcrumbsNav = ({ items = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: "40px",
        mt: "40px",
        "@media (max-width:768px)": {
          display: "none",
        },
      }}
    >
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const path = typeof item === "string" ? undefined : item.path;
        const isLast = index === items.length - 1;

        const buttonProps =
          isLast || !path
            ? {
                disabled: true,
                sx: {
                  ...buttonSx,
                  color: "#282828",
                  fontWeight: 500,
                  pointerEvents: "none",
                  "&.Mui-disabled": {
                    borderColor: "#DDD",
                    color: "#000",
                    opacity: 1,
                  },
                },
              }
            : {
                component: NavLink,
                to: path,
                sx: buttonSx,
              };

        const key = `crumb-${path || String(label)}-${index}`;

        return (
          <Fragment key={key}>
            <Button variant="outlined" {...buttonProps}>
              {label}
            </Button>
            {!isLast && <Divider />}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default BreadcrumbsNav;
