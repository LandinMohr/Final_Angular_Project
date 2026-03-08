import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectsService } from '../../../core/services/objects.service';

@Component({
  selector: 'app-object-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './object-create.html',
  styleUrls: ['./object-create.css']
})
export class ObjectCreate {

  private objectsService = inject(ObjectsService);
  private router = inject(Router);

  name = signal('');
  categories = signal<{ key: string; value: string }[]>([
    { key: '', value: '' }
  ]);

  successMessage = signal<string | null>(null);
  submitting = signal(false);

  isValid = computed(() => {
    const n = this.name().trim();
    const hasCategory = this.categories().some(
      c => c.key.trim() && c.value.trim()
    );

    return n.length >= 3 && hasCategory;
  });

  addCategory(): void {
    this.categories.update(arr => [...arr, { key: '', value: '' }]);
  }

  removeCategory(index: number): void {
    this.categories.update(arr => arr.filter((_, i) => i !== index));
  }

  updateKey(index: number, value: string): void {
    this.categories.update(arr => {
      const copy = [...arr];
      if (copy[index]) copy[index].key = value;
      return copy;
    });
  }

  updateValue(index: number, value: string): void {
    this.categories.update(arr => {
      const copy = [...arr];
      if (copy[index]) copy[index].value = value;
      return copy;
    });
  }

  submitForm(): void {

    if (!this.isValid()) return;

    this.submitting.set(true);

    const object = {
      id: Date.now().toString(),
      name: this.name().trim(),
      isLocal: true,
      data: this.categories().reduce((acc, item) => {
        if (item.key.trim()) acc[item.key.trim()] = item.value;
        return acc;
      }, {} as Record<string, any>)
    };

    this.objectsService.addObject(object);

    this.successMessage.set('Object created successfully!');

    setTimeout(() => {
      this.router.navigate(['/objects'], {
        queryParams: { created: 'true' }
      });
    }, 800);
  }
}