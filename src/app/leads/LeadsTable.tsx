'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Box,
  Grid,
} from '@mui/material';

const generateMockData = () => {
  const countries = ['USA', 'Canada', 'Brazil', 'India', 'Germany'];
  const statuses = ['PENDING', 'REACHED_OUT'];
  const names = new Set();
  const dates = new Set();

  // Função para gerar um nome único
  const generateUniqueName = () => {
    let name;
    do {
      name = `Lead ${Math.floor(Math.random() * 1000)}`;
    } while (names.has(name));
    names.add(name);
    return name;
  };

  // Função para gerar uma data única
  const generateUniqueDate = () => {
    let date;
    do {
      const randomDays = Math.floor(Math.random() * 365); // Dias aleatórios nos últimos 365 dias
      date = new Date(
        Date.now() - randomDays * 24 * 60 * 60 * 1000
      ).toLocaleDateString();
    } while (dates.has(date));
    dates.add(date);
    return date;
  };

  return Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: generateUniqueName(),
    submitted: generateUniqueDate(),
    status: statuses[index % 2],
    country: countries[index % 5],
  }));
};

const LeadsTable = () => {
  const [data, setData] = useState(generateMockData());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Altere para 8 itens por página

  const filteredData = data
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? lead.status === statusFilter : true)
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    data.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? lead.status === statusFilter : true)
    ).length / itemsPerPage
  );

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Submitted', accessor: 'submitted' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Country', accessor: 'country' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <Button
          onClick={() => {
            const updatedData = [...data];
            updatedData[row.index].status =
              updatedData[row.index].status === 'PENDING'
                ? 'REACHED_OUT'
                : 'PENDING';
            setData(updatedData);
          }}
        >
          Change Status
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Box
        style={{
          padding: '10px 0',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{ width: 400 }}
            />
          </Grid>
          <Grid item>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ width: 350 }}
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="REACHED_OUT">Reached Out</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          border: '1px solid #333',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ fontWeight: 'bold' }} key={column.Header}>
                    {column.Header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        const updatedData = [...data];
                        updatedData[index].status =
                          updatedData[index].status === 'PENDING'
                            ? 'REACHED_OUT'
                            : 'PENDING';
                        setData(updatedData);
                      }}
                    >
                      Change Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '15px 0',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </div>
  );
};

export default LeadsTable;
