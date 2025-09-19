import { Observable } from 'rxjs';

/**
 * Interface for data services that can load and save configuration data
 * @template T The type of configuration data
 */
export interface IDataService<T> {
  /**
   * Load configuration data
   * @returns Observable of configuration data
   */
  loadConfig(): Observable<T>;

  /**
   * Save configuration data
   * @param config The configuration data to save
   * @returns Observable of saved configuration data
   */
  saveConfig(config: T): Observable<T>;

  /**
   * Check if editing is enabled for this service
   * @returns True if editing is enabled, false otherwise
   */
  isEditingEnabled(): boolean;
}
