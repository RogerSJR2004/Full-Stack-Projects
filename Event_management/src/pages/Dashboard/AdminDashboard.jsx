import React, { useState } from 'react';
import EventList from '../../components/EventList';
import UserTable from '../../components/UserTable';
import '../../components/Dashboard.css';

// users details(update user model add like the update event model) and events details(add call pananum) 

// Mock data for demonstration
const mockEvents = [
  { id: 1, title: 'React Summit', date: '2024-07-10', time: '10:00', location: 'Hall A', description: 'A big React event.', speakers: ['Alice', 'Bob'], status: 'upcoming' },
  { id: 2, title: 'Node.js Meetup', date: '2024-06-01', time: '14:00', location: 'Room 2', description: 'Node.js for backend devs.', speakers: ['Charlie'], status: 'past' },
];
const mockUsers = [
  { name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210' },
];

export default function AdminDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  const handleEventClick = event => {
    setSelectedEvent(event);
    setShowUsers(false);
  };

  const handleShowUsers = () => {
    setShowUsers(true);
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Events</h2>
      <EventList events={mockEvents} onEventClick={handleEventClick} />
      <button className="add-event-btn">Add New Event</button>
      {/* Add/Edit/Delete/Upload functionality can be implemented here */}

      {selectedEvent && (
        <div className="event-details-modal">
          <h3>{selectedEvent.title} - Registered Users</h3>
          <button onClick={handleShowUsers}>View Registered Users</button>
          {showUsers && <UserTable users={mockUsers} />}
        </div>
      )}
    </div>
  );
}
