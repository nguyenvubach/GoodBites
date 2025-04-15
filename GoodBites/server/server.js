const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const authRoutes = require('./authRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
