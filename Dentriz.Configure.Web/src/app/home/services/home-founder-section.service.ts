import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeFounderSection } from '../models/home-founder-section.model';

@Injectable({
  providedIn: 'root'
})
export class HomeFounderSectionService {
  private configUrl = './home-founder-section.json';

  constructor(private http: HttpClient) {}

  getFounderSectionConfig(): Observable<HomeFounderSection> {
    return this.http.get<any>(this.configUrl).pipe(
      map(data => new HomeFounderSection(data))
    );
  }
}
