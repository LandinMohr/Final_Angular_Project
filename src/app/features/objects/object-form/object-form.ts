import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectsService } from '../../../core/services/objects.service';

@Component({
  selector: 'app-object-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './object-form.html',
  styleUrls: ['./object-form.css']
})
export class ObjectForm implements OnInit {

  private objectsService = inject(ObjectsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  name = signal('');
  color = signal('');
  price = signal<number | null>(null);

  submitting = signal(false);
  error = signal<string | null>(null);

  isEditMode = signal(false);
  editingId = signal<string | null>(null);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode.set(true);
      this.editingId.set(id);

      this.objectsService.getObjects().subscribe(list => {

        const object = list.find(o => o.id === id);

        // Only allow editing local objects
        if (!object || !object.isLocal) {
          alert('Editing is allowed only for user-created objects.');
          this.router.navigate(['/objects']);
          return;
        }

        this.name.set(object.name);
        this.color.set(object.data?.color || '');
        this.price.set(object.data?.price ?? null);

      });

    }

  }

  get isValid(): boolean {
    return this.name().trim().length >= 3 &&
           this.color().trim().length > 0 &&
           this.price() !== null &&
           this.price()! >= 0;
  }

  submitForm(): void {

    if (!this.isValid) return;

    this.submitting.set(true);

    if (this.isEditMode()) {

      const objects = this.objectsService.getObjectsSync();

      const index = objects.findIndex(
        o => o.id === this.editingId()
      );

      if (index !== -1 && objects[index].isLocal) {

        objects[index] = {
          ...objects[index],
          name: this.name().trim(),
          data: {
            color: this.color(),
            price: this.price()
          }
        };

        localStorage.setItem('objects', JSON.stringify(objects));
      }

    } else {

      this.objectsService.addObject({
        id: Date.now().toString(),
        name: this.name().trim(),
        isLocal: true,
        data: {
          color: this.color(),
          price: this.price()
        }
      });

    }

    this.submitting.set(false);

    this.router.navigate(['/objects'], {
      queryParams: { created: 'true' }
    });
  }

}