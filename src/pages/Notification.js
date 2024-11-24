import React from 'react'
import { Card } from 'react-bootstrap'
const Notification = () => {
  const notifications = [
    { id: 1, message: "Your balance has been updated." },
    { id: 2, message: "You received ₹200 cashback on your last transaction." },
    { id: 3, message: "Payment of ₹1500 to XYZ was successful." },
    { id: 4, message: "Low balance alert! Add funds to continue." },
    { id: 5, message: "Your monthly statement is ready to view." },
  ];

  return (
    <Card className="p-4" style={{minHeight:"750px"}}>
   
      {/* Add additional wallet functionalities here */}
      <div className="mt-4">
        <h5>Notifications</h5>
        {notifications.length > 0 ? (
          <ul className="list-group">
            {notifications.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No notifications available.</p>
        )}
      </div>
    </Card>
  )
}

export default Notification