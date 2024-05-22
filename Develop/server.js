const express = require('express');
const routes = require('./routes'); // This should point to your routes folder
const sequelize = require('./config/connection');

// Create an instance of the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the 'routes' folder
app.use('/api', routes);

// Catch-all route for handling "Wrong Route!" messages
app.use((req, res) => {
  res.status(404).send('Wrong Route!');
});

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});


app.use((req, res, next) => {
  res.status(404).send('Wrong Route!');
});