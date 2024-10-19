import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { NavLink } from "react-router-dom";

const DailyReport = () => {
  const [reportData, setReportData] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await fetch("http://localhost:2000/api/v1/daily-report");
      const data = await res.json();
      setReportData(data.data);
      setTotalBooks(data.totalBooks);
      setTotalEarnings(data.totalEarnings);
    };

    fetchReport();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Daily Borrowing Report", 10, 10);
    doc.text(`Total Books Borrowed: ${totalBooks}`, 10, 20);
    doc.text(`Total Earnings: Rs${totalEarnings}`, 10, 30);

    let yPos = 40;
    reportData.forEach((item, index) => {
      doc.text(
        `${index + 1}. Book Title: ${item.bookTitle}, Bill: Rs${
          item.billAmount
        }`,
        10,
        yPos
      );
      yPos += 10;
    });

    doc.save("daily_report.pdf");
  };

  return (
    <div>
      <div>
        <NavLink to="/">back</NavLink>
      </div>
      <h1>Daily Borrowing Report</h1>
      <h2>Total Books: {totalBooks}</h2>
      <h2>Total Earnings: ₹{totalEarnings}</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Bill Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.bookTitle}</td>
              <td>₹{item.billAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default DailyReport;
