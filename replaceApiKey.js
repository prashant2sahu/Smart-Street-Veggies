const fs = require('fs');
const path = require('path');

// Path to your built index.html file
const filePath = path.resolve(__dirname, 'build', 'index.html');

// Read and replace the placeholder in the HTML file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }
  const updatedHtml = data.replace(
    'API_KEY_PLACEHOLDER',
    process.env.REACT_APP_GOOGLE_MAP_API_KEY
  );

  // Write the updated HTML file back to the build folder
  fs.writeFile(filePath, updatedHtml, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.html:', err);
    } else {
      console.log('Successfully replaced API key in index.html');
    }
  });
});
