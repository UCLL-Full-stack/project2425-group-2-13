import React, { useState, useEffect } from 'react';
import Tour_Service from '@/Services/Tour_Service';
import { Tour } from '../../Types/index'; // Your updated Tour type
import { Tourist } from '../../Types/index'; // Assuming you have a Tourist type too

const Guide_Dashboard: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [newTour, setNewTour] = useState<Tour>({
    name: '',
    description: '',
    distance: 0,
    duration: 0,
    level: '',
    guide_id: 1, // Assuming the guide_id is 1 for testing purposes
    participants: [],
    number_of_participants: 0,
    day: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null); // Track which field is being edited

  // Temporary data for demonstration
  useEffect(() => {
    // Temporary static tours (replace this with actual fetch when ready)
    setTours([
      {
        id: 1,
        name: 'Mountain Adventure',
        description: 'An exciting mountain tour',
        distance: 20,
        duration: 5,
        level: 'Medium',
        guide_id: 1,
        participants: [
          { fname: 'John', lname: 'Doe', email: 'john@example.com' },
          { fname: 'Jane', lname: 'Smith', email: 'jane@example.com' },
        ],
        number_of_participants: 10,
        day: new Date(),
      },
      {
        id: 2,
        name: 'City Exploration',
        description: 'Explore the city with a guide',
        distance: 10,
        duration: 3,
        level: 'Easy',
        guide_id: 1,
        participants: [
          { fname: 'Alice', lname: 'Brown', email: 'alice@example.com' },
          { fname: 'Bob', lname: 'White', email: 'bob@example.com' },
        ],
        number_of_participants: 15,
        day: new Date(),
      },
    ]);
  }, []);

  // Handle creating a new tour
  const handleCreateTour = async () => {
    setIsLoading(true);
    try {
      const response = await Tour_Service.Create_Tour(newTour);
      if (response.ok) {
        fetchTours(); // Reload the tours after creation
        setNewTour({
          name: '',
          description: '',
          distance: 0,
          duration: 0,
          level: '',
          guide_id: 1,
          participants: [],
          number_of_participants: 0,
          day: new Date(),
        });
        setShowCreateForm(false); // Hide form after creation
      } else {
        console.error('Failed to create tour');
      }
    } catch (error) {
      console.error('Error creating tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing a tour 
  const handleEditTour = async (id: number, updatedTour: Tour) => {
    setIsLoading(true);
    try {
      const response = await Tour_Service.Update_Tour(id, updatedTour);
      if (response.ok) {
        fetchTours(); // Reload tours after editing
        setEditingField(null); // Stop editing after saving
      } else {
        console.error('Failed to update tour');
      }
    } catch (error) {
      console.error('Error updating tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a tour
  const handleDeleteTour = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await Tour_Service.Delete_Tour(id);
      if (response.ok) {
        fetchTours(); // Reload the tours after deletion
      } else {
        console.error('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (selectedTour) {
      setSelectedTour({ ...selectedTour, [field]: value });
    }
  };

  const handleEditField = (field: string) => {
    setEditingField(field === editingField ? null : field); // Toggle between edit and display mode
  };

  return (
    <div className="mt-10 flex flex-col relative">
      <h1 className="text-4xl font-bold mb-6">Guide Dashboard</h1>

      {/* Create Tour Button - Positioned lower */}
      <button
        onClick={() => setShowCreateForm(true)}
        className="absolute bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded mb-6 hover:bg-blue-600"
      >
        Create New Tour
      </button>

      {/* Create Tour Form - Conditionally rendered */}
      {showCreateForm && (
        <div className="p-6 border rounded-lg shadow bg-white mb-6 fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 border rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create a New Tour</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tour Name"
                value={newTour.name}
                onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                className="p-2 border rounded outline-none focus:ring focus:ring-blue-300"
              />
              <textarea
                placeholder="Description"
                value={newTour.description}
                onChange={(e) =>
                  setNewTour({ ...newTour, description: e.target.value })
                }
                className="p-2 border rounded outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="date"
                  value={newTour.distance}  // You should use a `Date` type here, or convert it accordingly
                  onChange={(e) =>
                    setNewTour({ ...newTour, day: e.target.value })  // Store the selected date as a string
                  }
                  className="p-2 border rounded outline-none focus:ring focus:ring-blue-300"
                />

              <input
                type="number"
                placeholder="Duration (hours)"
                value={newTour.duration}
                onChange={(e) =>
                  setNewTour({ ...newTour, duration: Number(e.target.value) })
                }
                className="p-2 border rounded outline-none focus:ring focus:ring-blue-300"
              />
              <select
                  value={newTour.level}
                  onChange={(e) =>
                    setNewTour({ ...newTour, level: e.target.value })
                  }
                className="p-2 border rounded outline-none focus:ring focus:ring-blue-300">
                        <option value="">Select Level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
              </select>

              <input
                type="number"
                placeholder="Number of Participants"
                value={newTour.number_of_participants}
                onChange={(e) =>
                  setNewTour({
                    ...newTour,
                    number_of_participants: Number(e.target.value),
                  })
                }
                className="p-2 border rounded outline-none focus:ring focus:ring-blue-300"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleCreateTour}
                  className={`bg-blue-500 text-white px-4 py-2 rounded font-bold ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Tour'}
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Your Tours Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedTour(tour)} // Open tour details
          >
            <h3 className="text-lg font-bold">{tour.name}</h3>
            <p className="text-sm text-gray-600">{tour.description}</p>
            <p className="text-sm text-gray-500">Duration: {tour.duration} hours</p>
          </div>
        ))}
      </div>

      {/* Selected Tour Details (Modal) */}
      {selectedTour && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 border rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Tour Details</h2>

            {/* Editable Fields */}
            <div className="mb-4 flex justify-between items-center">
              <span><strong>Name:</strong></span>
              <div className="flex gap-2 items-center">
                {editingField === 'name' ? (
                  <input
                    type="text"
                    value={selectedTour.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="p-2 border rounded"
                  />
                ) : (
                  <span>{selectedTour.name}</span>
                )}
                <button
                  onClick={() => handleEditField('name')}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <span><strong>Description:</strong></span>
              <div className="flex gap-2 items-center">
                {editingField === 'description' ? (
                  <textarea
                    value={selectedTour.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="p-2 border rounded"
                  />
                ) : (
                  <span>{selectedTour.description}</span>
                )}
                <button
                  onClick={() => handleEditField('description')}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <span><strong>Duration:</strong></span>
              <div className="flex gap-2 items-center">
                {editingField === 'duration' ? (
                  <input
                    type="number"
                    value={selectedTour.duration}
                    onChange={(e) => handleChange('duration', Number(e.target.value))}
                    className="p-2 border rounded"
                  />
                ) : (
                  <span>{selectedTour.duration} hours</span>
                )}
                <button
                  onClick={() => handleEditField('duration')}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <span><strong>Level:</strong></span>
              <div className="flex gap-2 items-center">
                {editingField === 'level' ? (
                  <input
                    type="string"
                    value={selectedTour.level}
                    onChange={(e) => handleChange('level', Number(e.target.value))}
                    className="p-2 border rounded"
                  />
                ) : (
                  <span>{selectedTour.level}</span>
                )}
                <button
                  onClick={() => handleEditField('level')}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
           <span><strong>Day:</strong></span>
          <div className="flex gap-2 items-center">
            {editingField === 'day' ? (
              <input
                type="date"
                value={selectedTour.day ? selectedTour.day.toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('day', new Date(e.target.value))}
                className="p-2 border rounded"
              />
            ) : (
              <span>{selectedTour.day ? selectedTour.day.toLocaleDateString() : 'No Date'}</span>
            )}
                      <button
                        onClick={() => handleEditField('day')}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                   Edit
                </button>
              </div>
            </div>


            {/* Participants Table */}
            <h3 className="mt-4 text-xl font-bold">Participants</h3>
            <table className="min-w-full table-auto mt-4 border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {selectedTour.participants.map((participant, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{participant.fname}</td>
                    <td className="px-4 py-2 border">{participant.lname}</td>
                    <td className="px-4 py-2 border">{participant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleEditTour(selectedTour.id!, selectedTour)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => handleDeleteTour(selectedTour.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedTour(null)} // Close tour details view
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide_Dashboard;
