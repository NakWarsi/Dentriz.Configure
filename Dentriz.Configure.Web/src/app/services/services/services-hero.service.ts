import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDataService } from '../../core/interfaces/data-service.interface';
import { DataServiceFactory } from '../../core/services/data-service.factory';
import { ServicesHeroApiService, SimpleServicesHeroConfig } from './services-hero-api.service';
import { ServicesHeroJsonService } from './services-hero-json.service';

export type { SimpleServicesHeroConfig };

/**
 * Unified service for services hero section data
 * Uses factory pattern to switch between API and JSON data sources
 */
@Injectable({
  providedIn: 'root'
})
export class ServicesHeroService implements IDataService<SimpleServicesHeroConfig> {
  private _dataService!: IDataService<SimpleServicesHeroConfig>;

  constructor(
    private injector: Injector // Injector to get specific services
  ) {
    this._dataService = DataServiceFactory.createService<SimpleServicesHeroConfig>(
      ServicesHeroApiService,
      ServicesHeroJsonService,
      this.injector.get(HttpClient) // Pass HttpClient as dependency
    );
  }

  loadConfig(): Observable<SimpleServicesHeroConfig> {
    return this._dataService.loadConfig();
  }

  saveConfig(config: SimpleServicesHeroConfig): Observable<SimpleServicesHeroConfig> {
    return this._dataService.saveConfig(config);
  }

  isEditingEnabled(): boolean {
    return this._dataService.isEditingEnabled();
  }
}
