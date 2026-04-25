const express =  require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({message: 'api working'});
});


module.exports = app;

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const auth = require('./middleware/authMiddleware');

app.get('/api/test', auth, (req, res) => {
  res.json({ message: 'Protected route working', userId: req.userId });
});

const activityRoutes = require('./routes/activityRoutes');

app.use('/api/activities', activityRoutes);
