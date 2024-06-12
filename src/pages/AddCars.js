import React, { useState } from 'react';
import Swal from 'sweetalert2';


function AddCarForm() {
  // State variables to store car information
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    rate: '',
    location: '',
    availability: true,
    type: '',
    inclusions: [],
    exclusions: [],

    image_url: '',
    description: ''
  });


  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCarData({
        ...carData,
        image_url: reader.result
      });
    };
    reader.readAsDataURL(file);

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send car data to the backend API
      const response = await fetch('https://mycab-api.onrender.com/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
      });

      if (response.ok) {
        // Car successfully added, reset form and show success alert
        setCarData({
          make: '',
          model: '',
          year: '',
          rate: '',
          location: '',
          availability: true,
          type: '',
          inclusions: '',
          exclusions: '',
          image_url: '',
          description: ''
        });
        Swal.fire({
          title: 'Success!',
          text: 'Car Added Successfully to Database',
          icon: 'success',
          confirmButtonText: 'ok'
        });
      } else {
        // Error occurred while adding car, show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Car not added to Database',
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }
    } catch (error) {

      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }
    // Optionally, clear the form or show a success message


  }

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="make" className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                id="make"
                name="make"
                value={carData.make}
                onChange={handleChange}
                placeholder="Enter car make"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={carData.model}
                onChange={handleChange}
                placeholder="Enter car model"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="year" className="form-label">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                name="year"
                value={carData.year}
                onChange={handleChange}
                placeholder="Enter car year"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="rate" className="form-label">Price per kilometer</label>
              <input
                type="number"
                className="form-control"
                id="rate"
                name="rate"
                value={carData.rate}
                onChange={handleChange}
                placeholder="Enter price per kilometer"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={carData.location}
                onChange={handleChange}
                placeholder="Enter car location"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="availability" className="form-label">Availability</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="availability"
                  name="availability"
                  checked={carData.availability}
                  onChange={(e) => setCarData({ ...carData, availability: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="availability">Available</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="type" className="form-label">Car Type</label>
              <select
                className="form-control"
                id="type"
                name="type"
                value={carData.type}
                onChange={handleChange}
              >
                <option value="">Select car type</option>
                <option value="hatchback">Hatchback</option>
                <option value="suv">SUV</option>
                <option value="muv">MUV</option>
                <option value="sedan">Sedan</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="inclusions" className="form-label">Inclusions</label>
              <input
                type="text"
                className="form-control"
                id="inclusions"
                name="inclusions"
                value={carData.inclusions}
                onChange={handleChange}
                placeholder="Enter inclusions"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="exclusions" className="form-label">Exclusions</label>
              <input
                type="text"
                className="form-control"
                id="exclusions"
                name="exclusions"
                value={carData.exclusions}
                onChange={handleChange}
                placeholder="Enter exclusions"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={carData.description}
              onChange={handleChange}
              placeholder="Enter car description"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {carData.image_url && (
              <img src={carData.image_url} alt="Selected Car" style={{ maxWidth: '100%', marginTop: '10px' }} />
            )}
          </div>

          <button type="submit" className="btn btn-danger btn-lg">Add Car</button>
        </form>
      </div>
    </>

  );

}


export default AddCarForm;
