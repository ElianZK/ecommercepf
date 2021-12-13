import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({handleChange,nButtons}) {
  return (
    <Stack spacing={2}>
      <Pagination count={parseInt(nButtons)} variant="outlined" shape="rounded" onChange={handleChange} />
    </Stack>
  );
}
