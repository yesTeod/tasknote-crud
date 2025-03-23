import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch all records from the API
  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/records');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (create or update record)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing record
        await fetch(`http://localhost:5000/api/records/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setEditingId(null);
      } else {
        // Create new record
        await fetch('http://localhost:5000/api/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      // Reset form and refresh records
      setFormData({ name: ''});
      fetchRecords();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  // Delete a record
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/records/${id}`, {
        method: 'DELETE'
      });
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // Set up record for editing
  const handleEdit = (record) => {
    setFormData({
      name: record.name,
    });
    setEditingId(record._id);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ name: '' });
    setEditingId(null);
  };

  return (
    <div className="app-container">
      <h1>Record Saving App</h1>
      
      <div className="form-container">
        <h2>{editingId ? 'Edit Record' : 'Add New Record'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="records-container">
        <h2>Records</h2>
        {records.length === 0 ? (
          <p>No records found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.name}</td>
                  <td>
                    <button onClick={() => handleEdit(record)}>Edit</button>
                    <button onClick={() => handleDelete(record._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;