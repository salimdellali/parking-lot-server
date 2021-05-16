const express = require('express');
const rateLimiter = require('./middlewares/rateLimiter');
require('dotenv/config');

const PORT = process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'; // to get "127.0.0.1" string rather than "::1" when calling req.ip
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// test if / route works
app.get('/', (req, res) => {
	res.send('we are on root');
});

app.listen(PORT, HOSTNAME, (err) => {
	if (err) console.error(err);
	console.log(`Server started on port ${PORT} ...`);
});
