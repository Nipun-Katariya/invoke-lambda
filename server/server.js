const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(express.static(path.join('/root/invoke-lambda', 'build')));

app.get('/invoke-lambda', async (req, res) => {
  try {
    const payload = req.query.payload;

    const apiEndpoint = 'https://wcm4919je4.execute-api.eu-west-1.amazonaws.com/default'; // Replace with your API Gateway endpoint

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload)
    };

    const response = await fetch(apiEndpoint, requestOptions);
    console.log(response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join('/root/invoke-lambda', 'build', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
