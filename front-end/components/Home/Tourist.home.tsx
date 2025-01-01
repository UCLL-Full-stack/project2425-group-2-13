import React, { useState, useEffect } from 'react';
import Tour_Service from '@/Services/Tour_Service';
import { Tour } from '../../Types/index'; // Your updated Tour type
import { Tourist } from '../../Types/index'; // Assuming you have a Tourist type too

const Tourist_Dashboard: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null); // Track which field is being edited


const fetchTours = async () => {
  try {
    const response = await Tour_Service.Get_all_Tours();
    if (response.ok) {
      const data: Tour[] = await response.json(); // Parse the JSON response into a Tour array
      setTours(data); // Set the state with the parsed data
    } else {
      console.error('Failed to fetch tours:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching tours:', error);
  }
};


  // Temporary data for demonstration
  useEffect(() => {
    // Temporary static tours (replace this with actual fetch when ready)
    fetchTours()

  }, []);





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
      <h1 className="text-4xl font-bold mb-6">Tourist Dashboard</h1>

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
              </div>
            </div>


            <div className="mb-4 flex justify-between items-center">
           <span><strong>Day:</strong></span>
          <div className="flex gap-2 items-center">
          <span>Temporary </span>
              </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
           <span><strong>Spots:</strong></span>
          <div className="flex gap-2 items-center">
          <span>{selectedTour.participants.length}/{selectedTour.number_of_participants}</span>
              </div>
            </div>


  

            {/* Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setSelectedTour(null)} // Close tour details view
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={() => handleEditField('name')} // change to joining hike
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Join Hike
              </button>




            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tourist_Dashboard;
