// components/LeadsTablessss.js
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
  InputAdornment,
} from '@mui/material';

const generateMockData = () => {
  const countries = ['USA', 'Canada', 'Brazil', 'India', 'Germany'];
  const statuses = ['PENDING', 'REACHED_OUT'];
  return Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Lead ${index + 1}`,
    submitted: new Date().toLocaleDateString(),
    status: statuses[index % 2],
    country: countries[index % 5],
  }));
};

const LeadsTablessss = () => {
  const [data, setData] = useState(generateMockData());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? lead.status === statusFilter : true)
    )
    .slice((currentPage - 1) * 10, currentPage * 10);

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
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
      />
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        displayEmpty
        fullWidth
        margin="normal"
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="PENDING">PENDING</MenuItem>
        <MenuItem value="REACHED_OUT">REACHED_OUT</MenuItem>
      </Select>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.Header}>{column.Header}</TableCell>
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

      <Pagination
        count={Math.ceil(filteredData.length / 10)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
      />
    </div>
  );
};

export default LeadsTablessss;
