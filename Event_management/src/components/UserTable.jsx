import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';

export default function UserTable({ users }) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    // Stub: implement CSV export if needed
    alert('Export to CSV not implemented.');
  };

  return (
    <div>
      <TextField label="Search by name or email" value={search} onChange={e => setSearch(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="outlined" onClick={handleExport} sx={{ mb: 2, ml: 2 }}>Export as CSV</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 