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
  MenuItem,
  Pagination,
  Grid,
} from '@mui/material';

import {
  LeadsTableContainer,
  SearchBox,
  StatusFilterBox,
  TableWrapper,
  PaginationWrapper,
} from './LeadsTableStyles';

type Lead = {
  id: number;
  name: string;
  submitted: string;
  status: 'PENDING' | 'REACHED_OUT';
  country: string;
};

const generateMockData = (): Lead[] => {
  const countries = ['USA', 'Canada', 'Brazil', 'India', 'Germany'];
  const statuses: Lead['status'][] = ['PENDING', 'REACHED_OUT'];
  const names = new Set<string>();
  const dates = new Set<string>();

  const generateUniqueName = (): string => {
    let name;
    do {
      name = `Lead ${Math.floor(Math.random() * 1000)}`;
    } while (names.has(name));
    names.add(name);
    return name;
  };

  const generateUniqueDate = (): string => {
    let date;
    do {
      const randomDays = Math.floor(Math.random() * 365);
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
  const [data, setData] = useState<Lead[]>(generateMockData());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<
    'PENDING' | 'REACHED_OUT' | ''
  >('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

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

  return (
    <LeadsTableContainer>
      <SearchBox>
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
            <StatusFilterBox
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as 'PENDING' | 'REACHED_OUT' | ''
                )
              }
              displayEmpty
              fullWidth
              sx={{ width: 350 }}
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="REACHED_OUT">Reached Out</MenuItem>
            </StatusFilterBox>
          </Grid>
        </Grid>
      </SearchBox>
      <TableWrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { Header: 'Name', accessor: 'name' },
                  { Header: 'Submitted', accessor: 'submitted' },
                  { Header: 'Status', accessor: 'status' },
                  { Header: 'Country', accessor: 'country' },
                  {
                    Header: 'Actions',
                    Cell: ({ row }: { row: { index: number } }) => (
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
                ].map((column) => (
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
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </PaginationWrapper>
      </TableWrapper>
    </LeadsTableContainer>
  );
};

export default LeadsTable;
