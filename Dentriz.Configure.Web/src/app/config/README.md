# Global Configuration System

This system provides a centralized way to control editing functionality across the entire application.

## Features

- **Global Editing Control**: Enable/disable all editing functionality with a single setting
- **Edit Button Visibility**: Control whether edit buttons are shown or hidden
- **Persistent Settings**: Configuration is saved to localStorage and persists across sessions
- **Admin Toggle**: Easy-to-use admin panel for controlling editing modes

## Usage

### For Administrators

1. **Access Admin Panel**: Add `?admin=true` to any URL to show the admin toggle panel
2. **Enable/Disable Editing**: Use the checkboxes to control editing functionality
3. **Quick Actions**: Use "Enable All" or "Disable All" buttons for quick changes

### For Developers

#### Using the GlobalConfigService

```typescript
import { GlobalConfigService } from './config/global-config.service';

constructor(private globalConfigService: GlobalConfigService) {}

// Check if editing is enabled
if (this.globalConfigService.isEditingEnabled) {
  // Allow editing
}

// Check if edit buttons should be shown
if (this.globalConfigService.showEditButtons) {
  // Show edit buttons
}

// Subscribe to configuration changes
this.globalConfigService.config$.subscribe(config => {
  // React to configuration changes
});
```

#### In Templates

```html
<!-- Show edit button only if globally enabled -->
<div *ngIf="globalConfig.showEditButtons && !isEditing">
  <button (click)="startEditing()">Edit</button>
</div>

<!-- Show edit icon only if globally enabled -->
<span class="edit-icon" *ngIf="globalConfig.showEditButtons && isEditing">✏️</span>
```

## Configuration Options

- `isEditingEnabled`: Controls whether any editing functionality is active
- `showEditButtons`: Controls whether edit buttons and icons are visible

## Implementation Status

✅ **Completed Components:**
- Home Component (all sections)
- About Component (all sections)
- Global Configuration Service
- Admin Toggle Component

🔄 **Remaining Components:**
- Contact Component
- Services Component  
- Smile Gallery Component

## API Methods

### GlobalConfigService Methods

- `setEditingEnabled(enabled: boolean)`: Enable/disable editing globally
- `setShowEditButtons(show: boolean)`: Show/hide edit buttons globally
- `enableAllEditing()`: Enable all editing functionality
- `disableAllEditing()`: Disable all editing functionality
- `resetToDefaults()`: Reset to default configuration
- `config$`: Observable for subscribing to configuration changes

## Admin Access

The admin toggle panel can be accessed by:
1. Adding `?admin=true` to any URL
2. Setting `localStorage.setItem('dentriz-admin-mode', 'true')` in browser console

## Default Configuration

```typescript
{
  isEditingEnabled: true,
  showEditButtons: true
}
```

When `isEditingEnabled` is set to `false`, all editing functionality is disabled and no edit buttons will be shown, regardless of the `showEditButtons` setting.
