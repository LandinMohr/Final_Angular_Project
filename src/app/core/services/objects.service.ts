import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  private apiUrl = 'https://api.restful-api.dev/objects';
  private storageKey = 'objects';

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // ==============================
  // Load Hybrid Dataset
  // ==============================
  getObjects(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl).pipe(

      map(apiObjects => {

        const localObjects = this.getLocalObjects();

        const merged = [...apiObjects, ...localObjects];

        // Deduplicate by ID (API is base dataset)
        const unique = Array.from(
          new Map(merged.map(o => [o.id, o])).values()
        );

        return unique.sort((a, b) => Number(a.id) - Number(b.id));
      }),

      catchError(() => of(this.getLocalObjects()))

    );
  }

  // ==============================
  // Local Storage Access
  // ==============================
  getObjectsSync(): any[] {
    if (!this.isBrowser()) return [];

    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private getLocalObjects(): any[] {
    return this.getObjectsSync().filter(o => o.isLocal);
  }

  // ==============================
  // Create Object (Local Only)
  // ==============================
  addObject(object: any): void {

    if (!this.isBrowser()) return;

    object.isLocal = true;

    const current = this.getObjectsSync();
    current.push(object);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(current)
    );
  }

  // ==============================
  // Delete Object (User Objects Only)
  // ==============================
  deleteObject(id: string): void {

    if (!this.isBrowser()) return;

    const updated = this.getObjectsSync()
      .filter(o => o.id !== id || !o.isLocal);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updated)
    );
  }

}