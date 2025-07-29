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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EnrollTable({ enrollments, onUpdateEnrollment, eventId, showEventName = false }) {
  const [search, setSearch] = useState('');
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  const filtered = enrollments.filter(enroll =>
    enroll.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    enroll.email_address?.toLowerCase().includes(search.toLowerCase()) ||
    enroll.mobile?.includes(search) ||
    enroll.country?.toLowerCase().includes(search.toLowerCase()) ||
    enroll.state?.toLowerCase().includes(search.toLowerCase()) ||
    (showEventName && enroll.event_name?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEditClick = (enrollment) => {
    setEditingEnrollment(enrollment);
    setEditForm({
      full_name: enrollment.full_name || '',
      email_address: enrollment.email_address || '',
      mobile: enrollment.mobile || '',
      country: enrollment.country || '',
      state: enrollment.state || '',
      district: enrollment.district || '',
      status: enrollment.status || 1,
      meta_1: enrollment.meta_1 || '',
      meta_2: enrollment.meta_2 || '',
      meta_3: enrollment.meta_3 || ''
    });
  };

  const handleEditChange = (field) => (e) => {
    setEditForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingEnrollment || !onUpdateEnrollment) return;
    
    // Use eventId from props or from enrollment data
    const currentEventId = eventId || editingEnrollment.event_id;
    if (!currentEventId) {
      alert('Cannot update enrollment: Event ID not found');
      return;
    }
    
    try {
      await onUpdateEnrollment(currentEventId, editingEnrollment.id, editForm);
      setEditingEnrollment(null);
      setEditForm({});
    } catch (err) {
      console.error('Error updating enrollment:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingEnrollment(null);
    setEditForm({});
  };

  const handleExport = () => {
    const csvContent = [
      ['Full Name', 'Email', 'Mobile', 'Country', 'State', 'District', 'Status', 'Created At', 'Meta 1', 'Meta 2', 'Meta 3'],
      ...filtered.map(enroll => [
        enroll.full_name || '',
        enroll.email_address || '',
        enroll.mobile || '',
        enroll.country || '',
        enroll.state || '',
        enroll.district || '',
        enroll.status ? 'Active' : 'Inactive',
        enroll.created_at ? new Date(enroll.created_at).toLocaleDateString() : '',
        enroll.meta_1 || '',
        enroll.meta_2 || '',
        enroll.meta_3 || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollments_${eventId || 'all'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    return status ? '#4caf50' : '#f44336';
  };

  const getStatusIcon = (status) => {
    return status ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <CancelIcon sx={{ fontSize: 16 }} />;
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
            placeholder="Search by name, email, mobile, country or state" 
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
              {showEventName && <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Event</TableCell>}
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Full Name</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Mobile</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Created At</TableCell>
              {onUpdateEnrollment && <TableCell sx={{ color: '#7bb6ff', fontWeight: 700 }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
                      <TableBody>
              {filtered.map((enroll, idx) => (
                <TableRow 
                  key={enroll.id || idx}
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
                  {showEventName && (
                    <TableCell sx={{ color: '#7bb6ff', fontWeight: 600, fontSize: '0.9rem' }}>
                      {enroll.event_name || 'Unknown Event'}
                    </TableCell>
                  )}
                  <TableCell sx={{ color: '#e3e9f7', fontWeight: 500 }}>
                    {enroll.full_name || 'N/A'}
                  </TableCell>
                <TableCell sx={{ color: '#e3e9f7' }}>
                  {enroll.email_address || 'N/A'}
                </TableCell>
                <TableCell sx={{ color: '#e3e9f7' }}>
                  {enroll.mobile || 'N/A'}
                </TableCell>
                <TableCell sx={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                  {[enroll.district, enroll.state, enroll.country].filter(Boolean).join(', ') || 'N/A'}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(enroll.status)}
                    label={enroll.status ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(enroll.status),
                      color: '#fff',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: '#fff'
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                  {enroll.created_at ? new Date(enroll.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                {onUpdateEnrollment && (
                  <TableCell>
                    <Tooltip title="Edit Enrollment">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditClick(enroll)}
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
            {search ? 'No enrollments found matching your search.' : 'No enrollments available.'}
          </Typography>
        </Box>
      )}

      {/* Edit Enrollment Dialog */}
      {editingEnrollment && (
        <Dialog open={true} onClose={handleCancelEdit} maxWidth="md" fullWidth>
          <DialogTitle>Edit Enrollment - {editingEnrollment.full_name}</DialogTitle>
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
                required
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
                label="Meta 1"
                value={editForm.meta_1}
                onChange={handleEditChange('meta_1')}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Meta 2"
                value={editForm.meta_2}
                onChange={handleEditChange('meta_2')}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Meta 3"
                value={editForm.meta_3}
                onChange={handleEditChange('meta_3')}
                margin="normal"
                multiline
                rows={2}
              />
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