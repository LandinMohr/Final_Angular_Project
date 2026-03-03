import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectForm } from './object-form';

describe('ObjectForm', () => {
  let component: ObjectForm;
  let fixture: ComponentFixture<ObjectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
