// Enhanced error handling for missing dependencies
console.log('🚀 Starting server...');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Node.js version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if node_modules exists
const fs = require('fs');
const path = require('path');

console.log('📁 Files in current directory:');
try {
  const files = fs.readdirSync(__dirname);
  files.forEach(file => {
    const stat = fs.statSync(path.join(__dirname, file));
    console.log(`  ${stat.isDirectory() ? '📁' : '📄'} ${file}`);
  });
} catch (error) {
  console.error('❌ Error reading directory:', error.message);
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
console.log('📁 Checking for node_modules:', nodeModulesPath);
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules directory exists');
  try {
    const nodeModulesContents = fs.readdirSync(nodeModulesPath);
    console.log('📦 node_modules contents:', nodeModulesContents.slice(0, 10).join(', '));
  } catch (error) {
    console.error('❌ Error reading node_modules:', error.message);
  }
} else {
  console.error('❌ node_modules directory not found!');
}

// Check if Express exists
const expressPath = path.join(__dirname, 'node_modules', 'express');
console.log('📦 Checking for Express:', expressPath);
if (fs.existsSync(expressPath)) {
  console.log('✅ Express directory exists');
  try {
    const expressContents = fs.readdirSync(expressPath);
    console.log('📦 Express contents:', expressContents.slice(0, 5).join(', '));
  } catch (error) {
    console.error('❌ Error reading Express directory:', error.message);
  }
} else {
  console.error('❌ Express directory not found!');
}

try {
  const express = require('express');
  console.log('✅ Express module loaded successfully');
  
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
