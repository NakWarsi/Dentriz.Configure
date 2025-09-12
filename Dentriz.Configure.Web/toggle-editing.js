#!/usr/bin/env node

/**
 * Simple script to toggle editing mode
 * Usage: node toggle-editing.js [on|off]
 */

const fs = require('fs');
const path = require('path');

const envDevPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
const envProdPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

function updateEnvironmentFile(filePath, enableEditing) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the ENABLE_EDITING value
    const newValue = enableEditing ? 'true' : 'false';
    content = content.replace(
      /ENABLE_EDITING:\s*(true|false)/g,
      `ENABLE_EDITING: ${newValue}`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${path.basename(filePath)} - ENABLE_EDITING: ${newValue}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function main() {
  const command = process.argv[2];
  
  if (command === 'on') {
    console.log('🔓 Enabling editing mode...');
    updateEnvironmentFile(envDevPath, true);
    updateEnvironmentFile(envProdPath, true);
    console.log('✅ Editing is now ENABLED. Restart your dev server to see changes.');
  } else if (command === 'off') {
    console.log('🔒 Disabling editing mode...');
    updateEnvironmentFile(envDevPath, false);
    updateEnvironmentFile(envProdPath, false);
    console.log('✅ Editing is now DISABLED. Restart your dev server to see changes.');
  } else {
    console.log('🎛️  DentRiz Editing Control');
    console.log('');
    console.log('Usage:');
    console.log('  node toggle-editing.js on   - Enable all editing');
    console.log('  node toggle-editing.js off  - Disable all editing');
    console.log('');
    console.log('After running, restart your development server with: ng serve');
  }
}

main();
