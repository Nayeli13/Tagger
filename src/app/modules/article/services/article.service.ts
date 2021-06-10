import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  /**
   * Obtiene los articulos registrados
  */
  getArticleCodes(): Observable<any>{
    return this.http.get(`${this.baseUrl}/articles`)
  }
}
