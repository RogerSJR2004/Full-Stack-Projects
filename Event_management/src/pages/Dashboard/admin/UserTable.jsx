import React, { useState } from 'react';
import { 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TextField, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Paper,
  Box,
  Typography,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

export default function UserTable({ users, onUpdateUser, showAllUsers = false }) {
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  const filtered = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email_address?.toLowerCase().includes(search.toLowerCase()) ||
    u.mobile?.includes(search) ||
    u.occupation?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      full_name: user.full_name || '',
      email_address: user.email_address || '',
      mobile: user.mobile || '',
      occupation: user.occupation || '',
      address_line_1: user.address_line_1 || '',
      address_line_2: user.address_line_2 || '',
      country: user.country || '',
      state: user.state || '',
      district: user.district || '',
      date_of_birth: user.date_of_birth || '',
      gender: user.gender || '',
      status: user.status || 1,
      role: user.role || 'user'
    });
  };

  const handleEditChange = (field) => (e) => {
    setEditForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingUser || !onUpdateUser) return;
    
    try {
      await onUpdateUser(editingUser.id, editForm);
      setEditingUser(null);
      setEditForm({});
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleExport = () => {
    const csvContent = [
      ['Full Name', 'Email', 'Mobile', 'Occupation', 'Country', 'State', 'District', 'Status', 'Role', 'Created At'],
      ...filtered.map(user => [
        user.full_name || '',
        user.email_address || '',
        user.mobile || '',
        user.occupation || '',
        user.country || '',
        user.state || '',
        user.district || '',
        user.status ? 'Active' : 'Inactive',
        user.role || 'user',
        user.created_at ? new Date(user.created_at).toLocaleDateString() : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1, 
          minWidth: 300,
          position: 'relative'
        }}>
          <SearchIcon sx={{ 
            position: 'absolute', 
            left: 12, 
            color: '#7bb6ff',
            zIndex: 1
          }} />
          <TextField 
            placeholder="Search by name, email, mobile or occupation" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            sx={{ 
              flex: 1,
              '& .MuiOutlinedInput-root': {
                pl: 4,
                background: 'rgba(36,41,54,0.6)',
                color: '#e3e9f7',
                '& fieldset': {
                  borderColor: 'rgba(123, 182, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(123, 182, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7bb6ff',
                },
                '& input': {
                  color: '#e3e9f7',
                },
                '& input::placeholder': {
                  color: '#b0b7c3',
                  opacity: 1,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#b0b7c3',
              },
            }}
            size="small"
          />
        </Box>
        <Button 
          variant="outlined" 
          onClick={handleExport}
          startIcon={<DownloadIcon />}
          sx={{
            borderColor: '#7bb6ff',
            color: '#7bb6ff',
            '&:hover': {
              borderColor: '#6ba5ef',
              background: 'rgba(123, 182, 255, 0.1)',
            }
          }}
        >
          Export CSV
        </Button>
      </Box>
      
      <Paper sx={{ 
        background: 'rgba(36,41,54,0.6)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(123, 182, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'rgba(123, 182, 255, 0.1)' }}>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Full Name</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Mobile</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Occupation</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Location</TableCell>
              {showAllUsers && <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Status</TableCell>}
              {showAllUsers && <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Role</TableCell>}
              {onUpdateUser && <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
        <TableBody>
          {filtered.map((user, idx) => (
            <TableRow 
              key={user.id || idx}
              sx={{ 
                '&:hover': { 
                  background: 'rgba(123, 182, 255, 0.05)',
                  transition: 'background 0.2s ease'
                },
                '&:nth-of-type(even)': {
                  background: 'rgba(36,41,54,0.3)'
                }
              }}
            >
              <TableCell sx={{ color: '#e3e9f7', fontWeight: 500 }}>{user.full_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#e3e9f7' }}>{user.email_address || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#e3e9f7' }}>{user.mobile || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#e3e9f7' }}>{user.occupation || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                {[user.district, user.state, user.country].filter(Boolean).join(', ') || 'N/A'}
              </TableCell>
              {showAllUsers && (
                <TableCell>
                  <span style={{ 
                    color: user.status ? '#4caf50' : '#f44336',
                    fontWeight: 'bold'
                  }}>
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
              )}
              {showAllUsers && (
                <TableCell>
                  <span style={{ 
                    color: user.role === 'admin' ? '#ff9800' : '#7bb6ff',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {user.role || 'user'}
                  </span>
                </TableCell>
              )}
              {onUpdateUser && (
                <TableCell>
                  <Tooltip title="Edit User">
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditClick(user)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
      
      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', padding: '20px', color: '#b0b7c3' }}>
          <Typography variant="body1">
            {search ? 'No users found matching your search.' : 'No users available.'}
          </Typography>
        </Box>
      )}

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={true} onClose={handleCancelEdit} maxWidth="md" fullWidth>
          <DialogTitle>Edit User - {editingUser.full_name}</DialogTitle>
          <DialogContent>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
              <TextField
                fullWidth
                label="Full Name"
                value={editForm.full_name}
                onChange={handleEditChange('full_name')}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email Address"
                value={editForm.email_address}
                onChange={handleEditChange('email_address')}
                margin="normal"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Mobile"
                value={editForm.mobile}
                onChange={handleEditChange('mobile')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Occupation"
                value={editForm.occupation}
                onChange={handleEditChange('occupation')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Date of Birth"
                value={editForm.date_of_birth}
                onChange={handleEditChange('date_of_birth')}
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Gender"
                value={editForm.gender}
                onChange={handleEditChange('gender')}
                margin="normal"
                select
                SelectProps={{ native: true }}
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </TextField>
              <TextField
                fullWidth
                label="Address Line 1"
                value={editForm.address_line_1}
                onChange={handleEditChange('address_line_1')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address Line 2"
                value={editForm.address_line_2}
                onChange={handleEditChange('address_line_2')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Country"
                value={editForm.country}
                onChange={handleEditChange('country')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="State"
                value={editForm.state}
                onChange={handleEditChange('state')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="District"
                value={editForm.district}
                onChange={handleEditChange('district')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Status"
                value={editForm.status}
                onChange={handleEditChange('status')}
                margin="normal"
                select
                SelectProps={{ native: true }}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </TextField>
              <TextField
                fullWidth
                label="Role"
                value={editForm.role}
                onChange={handleEditChange('role')}
                margin="normal"
                select
                SelectProps={{ native: true }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </TextField>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
} 