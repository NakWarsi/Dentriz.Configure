#!/usr/bin/env node

// Verification script for deployment package
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment package...');
console.log('Current directory:', process.cwd());

// Check if required files exist
const requiredFiles = [
  'server.js',
  'package.json',
  'index.html'
];

const requiredDirs = [
  'node_modules',
  'node_modules/express'
];

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('\n📁 Checking required directories:');
requiredDirs.forEach(dir => {
  const exists = fs.existsSync(dir);
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (!exists) {
    console.error(`❌ Missing required directory: ${dir}`);
    process.exit(1);
  }
});

// Check if Express can be required
console.log('\n🔧 Testing Express module:');
try {
  const express = require('express');
  console.log('✅ Express module loaded successfully');
  console.log(`   Version: ${require('./node_modules/express/package.json').version}`);
} catch (error) {
  console.error('❌ Failed to load Express module:', error.message);
  process.exit(1);
}

// Check package.json
console.log('\n📦 Checking package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   Name: ${packageJson.name}`);
  console.log(`   Main: ${packageJson.main}`);
  console.log(`   Dependencies: ${Object.keys(packageJson.dependencies || {}).join(', ')}`);
} catch (error) {
  console.error('❌ Failed to read package.json:', error.message);
  process.exit(1);
}

console.log('\n✅ Deployment package verification completed successfully!');
