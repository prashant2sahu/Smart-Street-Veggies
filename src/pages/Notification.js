import React from 'react'
import { Card } from 'react-bootstrap'
const Notification = () => {
  return (
    <Card className="p-4" style={{minHeight:"750px"}}>
      <h4>My Wallet</h4>
      <p>Balance: ₹5000</p>
      {/* Add additional wallet functionalities here */}
    </Card>
  )
}

export default Notification