const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const clubRoutes = require('./routes/clubs');

connectDB();

const app = express();
const port = 3000;

// Session middleware
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize/deserialize user (customize as needed)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: 829753005073-l9kam0mc2v6io2p5gj0gpu0msoc9i3k2.apps.googleusercontent.com,
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Here, find or create user in your DB
    return done(null, profile);
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.send(req.user ? `Hello, ${req.user.displayName}` : 'Not logged in');
});
//-----------------------------------------------
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);

app.listen(port,(e)=>{
    if(e) 
    {
        console.error("Error starting server:", e);
    }
    else
    {    
    console.log();
    console.log(`vanakkam da mapla ☄️❤️‍🔥🧩http://localhost:${port}`);
    }
})