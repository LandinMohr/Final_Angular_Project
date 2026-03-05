import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsService } from '../../../core/services/objects.service';
import { InventoryObject } from '../../../core/models/object.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-objects-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './objects-list.html',
  styleUrl: './objects-list.css'
})
export class ObjectsList implements OnInit {

  objects = signal<InventoryObject[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private objectsService: ObjectsService) {}

  ngOnInit(): void {
    this.fetchObjects();
  }

  private fetchObjects(): void {
    this.loading.set(true);
    this.error.set(null);

    const cachedObjects = localStorage.getItem('objects');
    if (cachedObjects) {
      this.objects.set(JSON.parse(cachedObjects));
      this.loading.set(false);
      return;
    }
    else {
   this.objectsService.getObjects().subscribe({
      next: (data: InventoryObject[]) => {
        localStorage.setItem('objects', JSON.stringify(data));
        this.objects.set(data); // Force change detection
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load objects.');
        this.loading.set(false);
      }
    });
    }
  }

  deleteObject(id: string): void {

    if (!confirm('Are you sure you want to delete this object?')) {
      return;
    }

    this.objectsService.deleteObject(id).subscribe({
      next: () => {
        this.objects.set(this.objects().filter(o => o.id !== id));
      },
      error: () => {
        alert('Delete failed.');
      }
    });

  }

}