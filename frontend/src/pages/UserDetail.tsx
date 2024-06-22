// src/pages/UserDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import CustomerProfile from "../components/CustomerProfile";
import { Users } from "../types";

const users: Users[] = [
  {
    id: 1,
    name: "Thiago",
    email: "wiegand@hotmail.com",
    country: "Saucerize",
    friends: 834,
    followers: 3645,
    status: "Active",
    phone: "123123123",
  },
  {
    id: 2,
    name: "Xavier",
    email: "tyrell86@company.com",
    country: "South Bradfordstad",
    friends: 634,
    followers: 2345,
    status: "Pending",
    phone: "12312223123",
  },
  // Add more users here for demonstration
];

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = users.find((user) => user.id === parseInt(id || "0", 10));

  if (!user) {
    return <Typography variant="h4">User not found</Typography>;
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Breadcrumb
        title="User Detail"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "User List", link: "/dashboard/users" },
          { name: "User Detail" },
        ]}
      />
      <CustomerProfile user={user} />
    </Container>
  );
};

export default UserDetail;
