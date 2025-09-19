import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IDataService } from '../interfaces/data-service.interface';

/**
 * Factory service to create appropriate data service based on environment configuration
 */
@Injectable({
  providedIn: 'root'
})
export class DataServiceFactory {
  
  /**
   * Create a data service instance based on environment configuration
   * @param apiServiceClass - The API-based service class
   * @param jsonServiceClass - The JSON-based service class
   * @param dependencies - Dependencies to pass to the service constructors
   * @returns The appropriate service instance
   */
  static createService<T>(
    apiServiceClass: new (...args: any[]) => IDataService<T>,
    jsonServiceClass: new (...args: any[]) => IDataService<T>,
    ...dependencies: any[]
  ): IDataService<T> {
    
    if (environment.dataSource === 'api') {
      return new apiServiceClass(...dependencies);
    } else {
      return new jsonServiceClass(...dependencies);
    }
  }

  /**
   * Check if the current environment supports editing
   */
  static isEditingEnabled(): boolean {
    return environment.dataSource === 'api';
  }

  /**
   * Check if the current environment uses API calls
   */
  static isApiMode(): boolean {
    return environment.dataSource === 'api';
  }

  /**
   * Get the current data source type
   */
  static getDataSource(): 'api' | 'json' {
    return environment.dataSource;
  }
}
