import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDataService } from '../../core/interfaces/data-service.interface';
import { DataServiceFactory } from '../../core/services/data-service.factory';
import { ServicesApiService, SimpleServicesConfig } from './services-api.service';
import { ServicesJsonService } from './services-json.service';

export type { SimpleServicesConfig };

/**
 * Unified service for services section data
 * Uses factory pattern to switch between API and JSON data sources
 */
@Injectable({
  providedIn: 'root'
})
export class ServicesService implements IDataService<SimpleServicesConfig> {
  private _dataService!: IDataService<SimpleServicesConfig>;

  constructor(
    private injector: Injector // Injector to get specific services
  ) {
    this._dataService = DataServiceFactory.createService<SimpleServicesConfig>(
      ServicesApiService,
      ServicesJsonService,
      this.injector.get(HttpClient) // Pass HttpClient as dependency
    );
  }

  loadConfig(): Observable<SimpleServicesConfig> {
    return this._dataService.loadConfig();
  }

  saveConfig(config: SimpleServicesConfig): Observable<SimpleServicesConfig> {
    return this._dataService.saveConfig(config);
  }

  isEditingEnabled(): boolean {
    return this._dataService.isEditingEnabled();
  }
}
