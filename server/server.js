const express = require('express');
const path = require('path');
const app = express();
let messages = [];
app.use(express.static(__dirname + '../../client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
