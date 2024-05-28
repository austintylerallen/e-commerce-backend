const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/', (req, res) => {
    res.send('<h1>Welcome to the API!</h1>');
  });
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });
  
module.exports = router;
