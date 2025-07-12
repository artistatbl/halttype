// create-sample-test.js - Script to create a sample test record
require('dotenv').config();
const { fetch } = require('undici');

async function createSampleTest() {
  try {
    console.log('Creating sample test...');
    
    // Call the API endpoint to create a sample test
    const response = await fetch('http://localhost:3000/api/tests/createSampleTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create sample test: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Sample test created successfully:', result);
  } catch (error) {
    console.error('Error creating sample test:', error.message);
  }
}

// Run the function
createSampleTest();