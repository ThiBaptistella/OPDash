import React, { useState, useMemo } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
  Typography,
  TextField,
  Box,
  Grid,
  useTheme,
  CssBaseline,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import StatisticCard from "../components/charts/StatisticCard";
import { Users as UsersType } from "../types";

const users: UsersType[] = [
  {
    id: 1,
    name: "Thiago",
    email: "thiago_ba@hotmail.com",
    country: "123123123",
    friends: 123123,
    followers: 123,
    status: "active",
    phone: "123123123123",
  },
  // Add more users here for demonstration
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const rowsPerPage = 20;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.phone.includes(search)
      ),
    [search]
  );

  const statistics: any[] = [
    // Add statistics data if needed
  ];

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Users"
        paths={[{ name: "Dashboard", link: "/dashboard" }, { name: "Users" }]}
      />

      <Grid container spacing={3} mb={2}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatisticCard
              title={stat.title}
              value={stat.value}
              color={stat.color}
              icon={stat.icon}
            />
          </Grid>
        ))}
      </Grid>

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
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Users List
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Profile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Membership</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((user, index) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          alt={user.name}
                          src={`https://i.pravatar.cc/150?u=${user.id}`}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">{user.name}</Typography>
                          <Typography variant="body2">{user.email}</Typography>
                          <Typography variant="body2">
                            {user.country}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.friends}</TableCell>
                    <TableCell>{user.followers}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/dashboard/users/${user.id}`)}
                      >
                        <ChatIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <BlockIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" my={2}>
          <Pagination
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Users;
