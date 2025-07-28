const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const clubRoutes = require('./routes/clubs');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const joinRequestsRouter = require('./routes/joinRequests');

connectDB();

const app = express();
const port = 5000;

app.use(cors({
  origin: "https://club-events.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


//-----------------------------------------------
app.get('/', (req, res) => {
  res.send(req.user ? `Hello, ${req.user.displayName}` : 'Not logged in');
});
//-----------------------------------------------

app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/join-requests', joinRequestsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port,(e)=>{
    if(e) 
    {
        console.error("Error starting server:", e);
    }
    else
    {    
    console.log();
    console.log(`server url ☄️❤️‍🔥🧩http://localhost:${port}`);
    }
})