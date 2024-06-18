// src/pages/UserDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Avatar, Box } from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";

const users = [
  {
    id: 1,
    name: "Curtis",
    email: "wiegand@hotmail.com",
    country: "Saucerize",
    friends: 834,
    followers: 3645,
    status: "Active",
  },
  {
    id: 2,
    name: "Xavier",
    email: "tyrell86@company.com",
    country: "South Bradfordstad",
    friends: 634,
    followers: 2345,
    status: "Pending",
  },
  // Add more users here for demonstration
];

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const user = users.find((user) => user.id === parseInt(id || "0", 10));

  if (!user) {
    return <Typography variant="h4">User not found</Typography>;
  }

  return (
    <Container>
      <Breadcrumb
        title="User Detail"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "User List", link: "/dashboard/users" },
          { name: "User Detail" },
        ]}
      />
      <Box display="flex" alignItems="center" my={2}>
        <Avatar
          alt={user.name}
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body1">Country: {user.country}</Typography>
          <Typography variant="body1">Friends: {user.friends}</Typography>
          <Typography variant="body1">Followers: {user.followers}</Typography>
          <Typography variant="body1">Status: {user.status}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserDetail;
