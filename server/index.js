const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use('/assets', express.static(path.join(__dirname, "..", "assets")))

app.use((req, res, next) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
})