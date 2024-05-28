const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the 'routes' folder
app.use('/', routes);

// Catch-all route for handling "Wrong Route!" messages
// app.use((req, res) => {
//   res.status(404).send('Wrong Route!');
// });

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
