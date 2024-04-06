import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.jikan.moe/v4';


  constructor(private http: HttpClient){}

  getAnimesStatus(status:string, query: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
    .set('status', status)
    .set('q', query)
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any>(`${this.baseUrl}/anime`, { params: params });
  }

  
  getAnimeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/anime/${id}`);
  }
  getAnimeByIdRecommendation(id: string): Observable<any> {
    console.log(`${id}`);
    return this.http.get<any>(`${this.baseUrl}/anime/${id}/recommendations`);
  }

  searchAnimeByName(query: string): Observable<any> {
    const url = `${this.baseUrl}/anime`;
    return this.http.get<any>(url, { params: { q: query } });
  }

  getAllAnimes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/anime`);
  }

}
