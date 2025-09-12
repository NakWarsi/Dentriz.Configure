import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GlobalConfigService, GlobalConfig } from './global-config.service';

@Component({
  selector: 'app-global-config-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="global-config-toggle" *ngIf="showToggle">
      <div class="config-panel">
        <h4>Edit Mode</h4>
        <div class="toggle-group">
          <label class="toggle-label">
            <input type="checkbox" 
                   [checked]="globalConfig.isEditingEnabled"
                   (change)="toggleEditingEnabled($event)">
            <span class="toggle-text">Enable Editing</span>
          </label>
          <label class="toggle-label">
            <input type="checkbox" 
                   [checked]="globalConfig.showEditButtons"
                   (change)="toggleShowEditButtons($event)">
            <span class="toggle-text">Show Edit Buttons</span>
          </label>
        </div>
        <div class="config-actions">
          <button class="btn-enable-all" (click)="enableAllEditing()">Enable All</button>
          <button class="btn-disable-all" (click)="disableAllEditing()">Disable All</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .global-config-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 16px;
      min-width: 250px;
      font-family: Arial, sans-serif;
    }

    .config-panel h4 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .toggle-group {
      margin-bottom: 16px;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      cursor: pointer;
      font-size: 14px;
    }

    .toggle-label input[type="checkbox"] {
      margin-right: 8px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .toggle-text {
      color: #555;
      user-select: none;
    }

    .config-actions {
      display: flex;
      gap: 8px;
    }

    .btn-enable-all,
    .btn-disable-all {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-enable-all {
      background: #28a745;
      color: white;
    }

    .btn-enable-all:hover {
      background: #218838;
    }

    .btn-disable-all {
      background: #dc3545;
      color: white;
    }

    .btn-disable-all:hover {
      background: #c82333;
    }

    /* Hide toggle by default - can be shown via query parameter or admin access */
    .global-config-toggle {
      display: none;
    }

    /* Show toggle when admin mode is enabled */
    .global-config-toggle.show {
      display: block;
    }
  `]
})
export class GlobalConfigToggleComponent implements OnInit, OnDestroy {
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;
  showToggle = false;

  constructor(private globalConfigService: GlobalConfigService) {}

  ngOnInit() {
    // Subscribe to global configuration changes
    this.configSubscription = this.globalConfigService.config$.subscribe(config => {
      this.globalConfig = config;
    });

    // Show toggle if admin mode is enabled (check URL parameter or localStorage)
    this.checkAdminMode();
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  private checkAdminMode() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const adminMode = urlParams.get('admin');
    
    // Check localStorage
    const storedAdminMode = localStorage.getItem('dentriz-admin-mode');
    
    this.showToggle = adminMode === 'true' || storedAdminMode === 'true';
  }

  toggleEditingEnabled(event: Event) {
    const target = event.target as HTMLInputElement;
    this.globalConfigService.setEditingEnabled(target.checked);
  }

  toggleShowEditButtons(event: Event) {
    const target = event.target as HTMLInputElement;
    this.globalConfigService.setShowEditButtons(target.checked);
  }

  enableAllEditing() {
    this.globalConfigService.enableAllEditing();
  }

  disableAllEditing() {
    this.globalConfigService.disableAllEditing();
  }
}
