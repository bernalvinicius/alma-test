import styled from 'styled-components';
import { Select, Box } from '@mui/material';

export const LeadsTableContainer = styled.div`
  padding: 20px;
`;

export const SearchBox = styled(Box)`
  padding: 10px 0;
`;

export const StatusFilterBox = styled(Select)`
  width: 350px;
`;

export const TableWrapper = styled(Box)`
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
`;

export const PaginationWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
`;
