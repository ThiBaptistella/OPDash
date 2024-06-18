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
  Chip,
  Card,
  useTheme,
  CardContent,
  CssBaseline,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import BlockIcon from "@mui/icons-material/Block";
import PeopleIcon from "@mui/icons-material/People";
import DownloadIcon from "@mui/icons-material/Download";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import StatisticCard from "../components/charts/StatisticCard";

type Status = "Active" | "Pending" | "Rejected";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  friends: number;
  followers: number;
  status: Status;
}

const users: User[] = [
  // Add user data
];

const statuses: Record<Status, string> = {
  Active: "green",
  Pending: "orange",
  Rejected: "red",
};

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
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
    setPage(1); // Reset to the first page on search
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAddInvoice = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/api/invoices", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Handle success
    } catch (error) {
      console.error("Error uploading file:", error); // Handle error
    }
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
    // Add statistics data
  ];

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="User List"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "User List" },
        ]}
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

      <Card elevation={0} sx={{ boxShadow: "none" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <Typography
                variant="h6"
                component="div"
                color={theme.palette.grey[900]}
                sx={{ fontWeight: "bold" }}
              >
                List
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Profile</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Friends</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Status</TableCell>
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
                          <Typography variant="body2">{user.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.friends}</TableCell>
                    <TableCell>{user.followers}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        style={{
                          backgroundColor: `${statuses[user.status]}22`,
                          color: statuses[user.status],
                        }}
                      />
                    </TableCell>
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
