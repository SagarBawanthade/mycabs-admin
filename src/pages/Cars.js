import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../css/Cars.css';

function Cars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch cars data from backend API
        const fetchData = async () => {
            try {
                const response = await fetch('https://mycab-api.onrender.com/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false); // Set loading to false when data fetching is done
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://mycab-api.onrender.com/api/cars/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete car');
            }
            Swal.fire({
                title: 'Success!',
                text: 'Successfully Deleted from Database',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Remove the car from the state
            setCars(cars.filter(car => car._id !== id));

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred while deleting the car',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <>

            <div className="container table-container" >
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead >
                                <tr  >
                                    <th scope="col">Image</th>
                                    <th scope="col">Make</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Availability</th>
                                    <th scope="col">Inclusions</th>
                                    <th scope="col">Exclusions</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "14px" }}>
                                {cars.map((car, index) => (
                                    <tr key={index}>
                                        <td><img src={car.image_url} alt={car.model} style={{ width: '100px', height: 'auto' }} /></td>
                                        <td>{car.make}</td>
                                        <td>{car.model}</td>
                                        <td>{car.year}</td>
                                        <td>{car.type}</td>
                                        <td>{car.rate}</td>
                                        <td>{car.location}</td>
                                        <td>{car.availability ? 'Yes' : 'No'}</td>
                                        <td>{car.inclusions}</td>
                                        <td>{car.exclusions}</td>
                                        <td>{car.description}</td>
                                        <td>
                                            <button onClick={() => handleDelete(car._id)} className="btn btn-danger">Delete Car</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cars;
