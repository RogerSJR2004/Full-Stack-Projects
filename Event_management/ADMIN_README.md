# Admin Dashboard - Event Management System

## Overview
The admin dashboard provides a comprehensive interface for managing events, users, and enrollments in real-time using data from your backend database.

## Features

### 🎯 Events Management
- **View All Events**: See all events with their details, status, and enrollment counts
- **Add New Events**: Create new events with all necessary details
- **Edit Events**: Update event information including name, description, dates, location, etc.
- **Event Status**: Track active/inactive events with visual indicators

### 👥 Users Management
- **View All Users**: Display all registered users with their details
- **Edit Users**: Update user information (name, email, phone, etc.)
- **Search Users**: Filter users by name, email, or phone number
- **Export Data**: Download user data as CSV files

### 📊 Enrollments Management
- **View Enrollments**: See all enrollments for specific events
- **Search Enrollments**: Filter enrollments by participant details
- **Export Data**: Download enrollment data as CSV files
- **Enrollment Details**: View comprehensive enrollment information

## API Endpoints Used

### Events
- `GET /event/list` - Fetch all events
- `POST /event/add` - Create new event
- `PUT /event/:id` - Update event
- `GET /event/:id` - Get specific event

### Users
- `GET /user/list` - Fetch all users
- `PUT /user/:id` - Update user information
- `GET /user/:id` - Get specific user

### Enrollments
- `GET /event/:eventId/list` - Get enrollments for specific event
- `PUT /event/:eventId/enroll/:enrollId` - Update enrollment

## Setup Instructions

1. **Backend Configuration**
   - Ensure your backend server is running on `http://localhost:3001`
   - Update the `API_BASE_URL` in `AdminDashboard.jsx` if your backend runs on a different port

2. **Frontend Setup**
   ```bash
   cd Full-Stack-Projects/Event_management
   npm install
   npm run dev
   ```

3. **Access Admin Dashboard**
   - Navigate to the admin dashboard route in your application
   - The dashboard will automatically fetch data from your backend

## Usage Guide

### Managing Events
1. Click on the "Events" tab to view all events
2. Click "Add New Event" to create a new event
3. Click on any event card to view details and manage enrollments
4. Use the "Edit Event" button to modify event information

### Managing Users
1. Click on the "Users" tab to view all users
2. Use the search bar to filter users
3. Click the edit icon next to any user to update their information
4. Export user data using the "Export as CSV" button

### Managing Enrollments
1. Click on an event to view its enrollments
2. Use the "View Enrollments" button to see all enrollments for that event
3. Search and filter enrollments as needed
4. Export enrollment data using the "Export as CSV" button

## Data Structure

### Event Object
```javascript
{
  id: number,
  event_name: string,
  event_description: string,
  event_date: string,
  event_location: string,
  event_link: string,
  event_video_link: string,
  event_image_link: string,
  publish_from: string,
  publish_to: string,
  status: number (1 = active, 0 = inactive)
}
```

### User Object
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  created_at: string,
  status: number
}
```

### Enrollment Object
```javascript
{
  id: number,
  event_id: number,
  full_name: string,
  email_address: string,
  mobile: string,
  country: string,
  state: string,
  district: string,
  status: string,
  meta_1: string,
  meta_2: string,
  meta_3: string
}
```

## Troubleshooting

### Common Issues

1. **Data not loading**
   - Check if your backend server is running
   - Verify the API_BASE_URL in AdminDashboard.jsx
   - Check browser console for error messages

2. **Update operations failing**
   - Ensure your backend routes are properly configured
   - Check that the user has proper permissions
   - Verify the data format being sent matches backend expectations

3. **CORS issues**
   - Make sure your backend has CORS properly configured
   - Check that the frontend and backend ports are correctly set

### Error Handling
The dashboard includes comprehensive error handling:
- Loading states while fetching data
- Error messages for failed operations
- Retry functionality for failed requests
- User-friendly notifications for all operations

## Customization

### Styling
- Modify `Dashboard.css` to change the appearance
- Update color schemes and layouts as needed
- Add custom animations and transitions

### Functionality
- Add new tabs for additional data types
- Implement delete functionality for events/users
- Add bulk operations for multiple items
- Implement real-time updates using WebSocket

## Security Considerations

1. **Authentication**: Ensure proper authentication is implemented
2. **Authorization**: Verify user roles and permissions
3. **Data Validation**: Validate all input data on both frontend and backend
4. **API Security**: Use HTTPS and implement proper API security measures

## Performance Optimization

1. **Pagination**: Implement pagination for large datasets
2. **Caching**: Add caching for frequently accessed data
3. **Lazy Loading**: Load data on demand
4. **Debouncing**: Implement search debouncing for better performance 