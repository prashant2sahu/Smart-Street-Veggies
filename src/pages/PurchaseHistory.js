import { Card, Table } from 'react-bootstrap';

const PurchaseHistory = () => {
  const purchaseData = [
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 2, amount: "₹120" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 5, amount: "₹420" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 1, amount: "₹20" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 5, amount: "₹420" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 1, amount: "₹20" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" },
    { date: "12-10-2024", orderId: "gJXGJ1711214/2662780", items: 3, amount: "₹320" }
  ];

  return (
    <Card className="p-4" style={{minHeight:"700px"}}>
      <h4 className="mb-3">Purchase History</h4>
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <Table striped bordered hover size="sm" responsive>
          <thead style={{ background: '#2B4F61', color: 'white' }}>
            <tr>
              <th>Date</th>
              <th>Order Id/Transaction Id</th>
              <th>Items</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData.map((item, index) => (
              <tr key={index} style={{ gap:"20px" }}>
                <td>{item.date}</td>
                <td>{item.orderId}</td>
                <td>{item.items}</td>
                <td>{item.amount}</td>
              </tr>
              
               ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default PurchaseHistory;
