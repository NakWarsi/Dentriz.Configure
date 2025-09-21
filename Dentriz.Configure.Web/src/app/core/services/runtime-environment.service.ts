import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuntimeEnvironmentService {
  private _runtimeOverride: any = null;

  constructor() {
    // Check for runtime environment override
    if (typeof window !== 'undefined' && (window as any).ENVIRONMENT_OVERRIDE) {
      this._runtimeOverride = (window as any).ENVIRONMENT_OVERRIDE;
      console.log('🔧 Runtime environment override detected:', this._runtimeOverride);
    }
  }

  get dataSource(): 'api' | 'json' {
    return this._runtimeOverride?.dataSource || environment.dataSource;
  }

  get apiBaseUrl(): string {
    return this._runtimeOverride?.apiBaseUrl || environment.apiBaseUrl;
  }

  get enableEditing(): boolean {
    return this._runtimeOverride?.enableEditing || environment.enableEditing;
  }

  get enableApiCalls(): boolean {
    return this._runtimeOverride?.enableApiCalls || environment.enableApiCalls;
  }

  get production(): boolean {
    return this._runtimeOverride?.production || environment.production;
  }

  // Get the complete environment object
  get environment() {
    return {
      dataSource: this.dataSource,
      apiBaseUrl: this.apiBaseUrl,
      enableEditing: this.enableEditing,
      enableApiCalls: this.enableApiCalls,
      production: this.production
    };
  }
}
