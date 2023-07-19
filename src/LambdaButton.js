import React from 'react';

const invokeLambda = async () => {
  const apiEndpoint = 'https://wcm4919je4.execute-api.eu-west-1.amazonaws.com/default'; // Replace with your API Gateway endpoint

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
  };

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch(apiEndpoint, requestOptions);
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
