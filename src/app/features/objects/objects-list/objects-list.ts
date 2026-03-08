import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ObjectsService } from '../../../core/services/objects.service';

@Component({
  selector: 'app-objects-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './objects-list.html',
  styleUrls: ['./objects-list.css']
})
export class ObjectsList implements OnInit {

  private objectsService = inject(ObjectsService);
  private route = inject(ActivatedRoute);

  objects = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  page = signal(1);
  pageSize = signal(5);

  paginatedObjects = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.objects().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.objects().length / this.pageSize()))
  );

  ngOnInit(): void {
    this.fetchObjects();

    const created = this.route.snapshot.queryParamMap.get('created');

    if (created === 'true') {
      this.successMessage.set('Object created successfully!');
      setTimeout(() => this.successMessage.set(null), 3000);
    }
  }

  fetchObjects(): void {

    this.loading.set(true);
    this.error.set(null);

    this.objectsService.getObjects().subscribe({
      next: (list) => {
        this.objects.set(list);
      },
      error: () => {
        this.error.set('Failed to load objects.');
      },
      complete: () => {
        this.loading.set(false);
      }
    });

  }

  deleteObject(id: string): void {

    if (!confirm('Are you sure you want to delete this object?')) return;

    this.objectsService.deleteObject(id);

    this.fetchObjects();
  }

  prevPage(): void {
    this.page.update(p => Math.max(1, p - 1));
  }

  nextPage(): void {
    this.page.update(p =>
      Math.min(this.totalPages(), p + 1)
    );
  }

}