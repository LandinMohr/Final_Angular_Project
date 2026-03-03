import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsList } from './objects-list';

describe('ObjectsList', () => {
  let component: ObjectsList;
  let fixture: ComponentFixture<ObjectsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
