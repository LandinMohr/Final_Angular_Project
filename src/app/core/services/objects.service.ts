import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  private baseUrl = 'https://api.restful-api.dev/objects';

  constructor(private http: HttpClient) {}

  getObjects() {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteObject(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}