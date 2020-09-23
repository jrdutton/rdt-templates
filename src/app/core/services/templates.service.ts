import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  constructor(private http: HttpClient) {}
}
