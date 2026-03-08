import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectsService } from '../../../core/services/objects.service';

@Component({
  selector: 'app-object-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './object-edit.html',
  styleUrls: ['./object-edit.css']
})
export class ObjectEdit implements OnInit {

  private objectsService = inject(ObjectsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  name = signal('');
  color = signal('');
  price = signal<number | null>(null);

  ngOnInit() {

    const objectId = this.route.snapshot.paramMap.get('id');
    if (!objectId) return;

    this.objectsService.getObjects().subscribe(list => {

      const object = list.find(o => o.id === objectId);

      // Only allow editing local objects
      if (!object || !object.isLocal) {
        alert('Editing is allowed only for user-created objects.');
        this.router.navigate(['/objects']);
        return;
      }

      this.id.set(objectId);
      this.name.set(object.name);
      this.color.set(object.data?.color || '');
      this.price.set(object.data?.price ?? null);

    });

  }

  submitForm() {

    if (!this.id()) return;

    const objects = this.objectsService.getObjectsSync();

    const index = objects.findIndex(o => o.id === this.id());

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

    this.router.navigate(['/objects']);

  }
}