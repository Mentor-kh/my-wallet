import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ITransaction } from '../components/data-table/data-table.component';
import { ICategories } from '../components/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private configUrl: string = environment.api;
  private flag: string = environment.production ? '.json' : '.json';
  public constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  public getData(): Observable<any> {
    return this.http.get(`${this.configUrl}/data.json`);
  }
  public getCategories(): Observable<any> {
    return this.http.get(`${this.configUrl}/categories.json`);
  }
  public addCategory(category: ICategories[]): Observable<any> {
    return this.http.put(`${this.configUrl}/categories.json`, category);
  }
  public getUser(): Observable<any> {
    return this.http.get(`${this.configUrl}/profile.json`);
  }
  public addData(data: ITransaction[]): Observable<any> {
    return this.http.put(`${this.configUrl}/data.json`, data);
  }
  public removeData(data: ITransaction[]): Observable<any> {
    return this.http.put(`${this.configUrl}/data.json`, data);
  }
}
