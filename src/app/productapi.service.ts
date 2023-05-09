import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductapiService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  getdata(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(map((res) => res));
  }

  getloginDetails() {
    return this.http.get<any[]>('../assets/Model/login.json');
  }
}
