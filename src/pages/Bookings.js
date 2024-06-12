import React, { useState } from 'react';
import '../css/Booking.css';


const Bookings = () => {
    const [bookings, setBookings] = useState([
        {
            user_name: "John Doe",
            car_id: "Toyota Corolla",
            pickup_date: "2021-06-01",
            return_date: "2021-06-10",
            from: "Lahore",
            destination: "Islamabad",
        }
    ]);




    return (
        <div>
            <h2>Manage Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Car</th>
                        <th>Pickup Date</th>
                        <th>Return Date</th>
                        <th>From</th>
                        <th>Destination</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.user_name}</td>
                            <td>{booking.car_id}</td>
                            <td>{new Date(booking.pickup_date).toLocaleDateString()}</td>
                            <td>{new Date(booking.return_date).toLocaleDateString()}</td>
                            <td>${booking.from}</td>
                            <td>${booking.destination}</td>
                            <td>
                                <button >Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;
