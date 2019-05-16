import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private configUrl: string = environment.api;
  public constructor(private http: HttpClient) { }

  public getCategories(): Observable<any> {
    return this.http.get(`${this.configUrl}/categories.json`);
  }
}
