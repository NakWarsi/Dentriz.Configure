// Enhanced error handling for missing dependencies
try {
  const express = require('express');
  const path = require('path');
  
  console.log('Express module loaded successfully');
  console.log('Current working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  console.log('Files in current directory:');
  require('fs').readdirSync(__dirname).forEach(file => {
    console.log('  -', file);
  });
  
  const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from the dist directory with caching
app.use(express.static(path.join(__dirname, 'dist/DentrizWeb/browser'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// Handle every other route by returning Angular's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/DentrizWeb/browser/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

  // Start the app
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  
} catch (error) {
  console.error('Failed to start server:');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  
  // Check if it's a module not found error
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('Missing module:', error.message.split("'")[1]);
    console.error('Please ensure all dependencies are installed.');
    console.error('Run: npm install');
  }
  
  process.exit(1);
}
