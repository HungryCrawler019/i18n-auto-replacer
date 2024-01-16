const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'translation.json');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  // Parse the JSON content into an object
  const obj = JSON.parse(data);

  // Iterate over the object keys and set the values to match the keys
  Object.keys(obj).forEach(key => {
    obj[key] = key;
  });

  // Convert the object back to a JSON string
  const updatedJson = JSON.stringify(obj, null, 2); // The '2' argument adds indentation for readability

  // Write the updated JSON string back to the file
  fs.writeFile(jsonFilePath, updatedJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the JSON file:', err);
    } else {
      console.log('JSON file has been updated.');
    }
  });
});