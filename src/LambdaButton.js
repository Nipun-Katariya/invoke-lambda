import React from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'client',
  secretAccessKey: 'np1]Ue77$8X]bN'
});

const lambda = new AWS.Lambda();

const invokeLambda = async () => {
  const payload = {
    "operation": "sign_transaction",
    "transaction_payload": {
      "value": 0.01,
      "to": "0xa5D3241A1591061F2a4bB69CA0215F66520E67cf",
      "nonce": 0,
      "type": 2,
      "chainId": 4,
      "gas": 100000,
      "maxFeePerGas": 100000000000,
      "maxPriorityFeePerGas": 3000000000
    }
  }

  const params = {
    FunctionName: 'YOUR_LAMBDA_FUNCTION_NAME',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload)
  };

  try {
    const response = await lambda.invoke(params).promise();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const LambdaButton = () => {
  return (
    <button onClick={invokeLambda}>
      Call Lambda Function
    </button>
  );
};

export default LambdaButton;
