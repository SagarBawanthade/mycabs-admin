import '../css/Dashboard.css';
import carIcon from '../images/car.png';
import booking from '../images/booking.png';
import visitor from '../images/visitor.png';
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [totalCars, setTotalCars] = useState(0);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://mycab-api.onrender.com/api/cars');
            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }
            const data = await response.json();
            setCars(data);
            setTotalCars(data.length); // Set the total number of cars
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    return (
        <><br />
            <br />

            <div className="scrolling-text-container">
                <div className="scrolling-text-inner" style={{ "--marquee-speed": "20s", "--direction": "scroll-left" }} role="marquee">
                    <div className="scrolling-text">
                        <div style={{ color: "red", textAlign: "center" }} className="scrolling-text-item">This Dashboard data is coming from the <strong style={{ color: "black", textAlign: "center" }}>@RideHub Cabs </strong>database as you add or delete the data from database changes will reflect automatically in no time.</div>

                    </div>
                </div>
            </div><br />
            <br />
            <br />



            <div className='container'>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={carIcon} className="card-img-top" alt="car Icon" />
                    <div className="card-body">
                        <h5 className="card-title">Total Cars</h5>
                        <h5 style={{ fontSize: "40px" }} className="card-title">{totalCars}</h5>

                    </div>
                </div>

                <div className="card" style={{ width: "18rem" }}>
                    <img style={{ marginTop: "30px", height: "100px", width: "100px", marginBottom: "20px" }} src={booking} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Total Bookings</h5>
                        <h5 style={{ fontSize: "40px" }} className="card-title">15</h5>

                    </div>
                </div>

                <div className="card" style={{ width: "18rem" }}>
                    <img style={{ marginTop: "30px", height: "100px", width: "100px", marginBottom: "20px" }} src={visitor} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Total Visitors</h5>
                        <h5 style={{ fontSize: "40px" }} className="card-title">15</h5>
                    </div>
                </div>


            </div>


        </>
    )
}

export default Dashboard;