
const mongoose = require("mongoose");



const dbConnect = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/BookDB", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		.then(() => console.log("DB CONNECTION SUCCESS"))

		.catch((err) => {
			console.log(`DB CONNECTION ISSUES`);
			console.error(err.message);
			process.exit(1);
		});
};


module.exports = dbConnect;
