import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GlobalConfig {
  isEditingEnabled: boolean;
  showEditButtons: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  private configSubject = new BehaviorSubject<GlobalConfig>({
    isEditingEnabled: environment.ENABLE_EDITING,  // Use environment variable
    showEditButtons: environment.ENABLE_EDITING    // Use environment variable
  });

  public config$: Observable<GlobalConfig> = this.configSubject.asObservable();

  constructor() {
    // Load configuration from localStorage if available
    this.loadConfigFromStorage();
  }

  /**
   * Get current configuration
   */
  get currentConfig(): GlobalConfig {
    return this.configSubject.value;
  }

  /**
   * Check if editing is enabled globally
   */
  get isEditingEnabled(): boolean {
    return this.configSubject.value.isEditingEnabled;
  }

  /**
   * Check if edit buttons should be shown
   */
  get showEditButtons(): boolean {
    return this.configSubject.value.showEditButtons;
  }

  /**
   * Enable or disable editing globally
   */
  setEditingEnabled(enabled: boolean): void {
    this.updateConfig({ isEditingEnabled: enabled });
  }

  /**
   * Show or hide edit buttons globally
   */
  setShowEditButtons(show: boolean): void {
    this.updateConfig({ showEditButtons: show });
  }

  /**
   * Update the global configuration
   */
  updateConfig(updates: Partial<GlobalConfig>): void {
    const currentConfig = this.configSubject.value;
    const newConfig = { ...currentConfig, ...updates };
    this.configSubject.next(newConfig);
    this.saveConfigToStorage(newConfig);
  }

  /**
   * Reset configuration to defaults
   */
  resetToDefaults(): void {
    const defaultConfig: GlobalConfig = {
      isEditingEnabled: environment.ENABLE_EDITING,
      showEditButtons: environment.ENABLE_EDITING
    };
    this.configSubject.next(defaultConfig);
    this.saveConfigToStorage(defaultConfig);
  }

  /**
   * Disable all editing functionality
   */
  disableAllEditing(): void {
    this.updateConfig({
      isEditingEnabled: false,
      showEditButtons: false
    });
  }

  /**
   * Enable all editing functionality
   */
  enableAllEditing(): void {
    this.updateConfig({
      isEditingEnabled: environment.ENABLE_EDITING,
      showEditButtons: environment.ENABLE_EDITING
    });
  }

  /**
   * Save configuration to localStorage
   */
  private saveConfigToStorage(config: GlobalConfig): void {
    try {
      localStorage.setItem('dentriz-global-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save global config to localStorage:', error);
    }
  }

  /**
   * Load configuration from localStorage
   */
  private loadConfigFromStorage(): void {
    try {
      const stored = localStorage.getItem('dentriz-global-config');
      if (stored) {
        const config = JSON.parse(stored) as GlobalConfig;
        this.configSubject.next(config);
      }
    } catch (error) {
      console.warn('Failed to load global config from localStorage:', error);
    }
  }
}
