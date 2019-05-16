import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategories } from '../components/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryExistService {
  private configUrl: string = environment.api;
  public constructor(private http: HttpClient) { }

  public checkCategory(category: string) {
    return this.http.get(`${this.configUrl}/categories.json`).pipe(
      map((data: ICategories[]) => {
        if (data.filter((cat: ICategories) => category === cat.category).length === 0) {
          return { isCategoryAvailable: true };
        } else {
          return { isCategoryAvailable: false };
        }
      })
    );
  }
}
