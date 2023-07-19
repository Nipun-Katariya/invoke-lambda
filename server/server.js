const express = require('express');
const AWS = require('aws-sdk');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'client',
  secretAccessKey: 'np1]Ue77$8X]bN'
});

const app = express();
const lambda = new AWS.Lambda();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/invoke-lambda', async (req, res) => {
  try {
    const payload = {
      // Your JSON payload here
      message: 'Hello from React!'
    };

    const params = {
      FunctionName: 'YOUR_LAMBDA_FUNCTION_NAME',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload)
    };

    const response = await lambda.invoke(params).promise();
    console.log(response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
