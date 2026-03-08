import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectsService } from '../../../core/services/objects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-object-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './object-details.html',
  styleUrls: ['./object-details.css']
})
export class ObjectDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private objectsService = inject(ObjectsService);

  object = signal<any>(null);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // Load objects list and find matching object
    this.objectsService.getObjects().subscribe(list => {
      this.object.set(
        list.find(obj => obj.id === id) || null
      );
    });
  }

}