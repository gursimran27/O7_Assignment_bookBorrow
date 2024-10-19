const express = require("express");
const router = express.Router();

const Borrow = require("../model/borrow")

const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

router.post("/data", async (req, res) => {
  try {
    const { bookId, bookTitle, name, contact, dateTime, returnDateTime } = req.body;

    if (!bookId || !bookTitle || !name || !contact || !dateTime || !returnDateTime) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    const borrowDate = dayjs(dateTime);
    const returnDate = dayjs(returnDateTime);

    if (!borrowDate.isValid() || !returnDate.isValid()) {
      return res.status(400).json({
        status: 400,
        message: "Invalid date format",
      });
    }

    const diff = dayjs.duration(returnDate.diff(borrowDate));
    const totalDays = Math.floor(diff.asDays());
    const totalHours = Math.floor(diff.asHours()) % 24;

    console.log(diff,totalDays,totalHours)

    let totalBill = 0;
    let formula = "";

    if (totalDays === 0) {
      totalBill = 5;
      formula = "₹5 (Minimum charge for same day return)";
    } else {
      const first7Days = Math.min(totalDays, 7);
      const additionalDays = totalDays > 7 ? totalDays - 7 : 0;
      totalBill += first7Days * 5;
      totalBill += additionalDays * 10;
      totalBill += totalDays > 7 ? totalHours * 1 : null;

      formula = `(${first7Days} days at ₹5/day) + (${additionalDays} days at ₹10/day) + (${totalHours} hours at ₹1/hour)`;
    }


    await Borrow.create({
        bookId,
        bookTitle,
        name,
        contact,
        borrowDate,
        returnDate,
        billAmount: totalBill
    })

    // Prepare the response
    return res.status(200).json({
      status: 200,
      message: "Book rented successfully",
      receipt: {
        borrowDate: borrowDate.format("YYYY-MM-DD HH:mm"),
        returnDate: returnDate.format("YYYY-MM-DD HH:mm"),
        totalTime: `${totalDays} days and ${totalHours} hours`,
        totalBill,
        formula,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});



router.get("/daily-report", async (req, res) => {
    try {
      const startOfDay = new Date().setHours(0, 0, 0, 0);
      const endOfDay = new Date().setHours(23, 59, 59, 999);
  
      const dailyBorrowings = await Borrow.find({
        borrowDate: { $gte: startOfDay, $lt: endOfDay },
      }).sort({ billAmount: -1 });
  
      const totalBooks = dailyBorrowings.length;
      const totalEarnings = dailyBorrowings.reduce((sum, record) => sum + record.billAmount, 0);
  
      res.status(200).json({
        status: 200,
        data: dailyBorrowings,
        totalBooks,
        totalEarnings,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  });
  

module.exports = router;
