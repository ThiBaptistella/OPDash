// src/components/Breadcrumb.tsx
import React from "react";
import { Breadcrumbs, Link, Typography, Box, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface BreadcrumbProps {
  title: string;
  paths: Array<{ name: string; link?: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, paths }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          <HomeIcon fontSize="small" />
        </Link>
        {paths.map((path, index) => (
          <Link
            key={index}
            color={index === paths.length - 1 ? "textPrimary" : "inherit"}
            href={path.link || "#"}
            sx={{ textDecoration: "none" }}
          >
            {path.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
