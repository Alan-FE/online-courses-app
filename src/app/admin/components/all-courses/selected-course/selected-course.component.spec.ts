import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCourseComponent } from './selected-course.component';

describe('SelectedCourseComponent', () => {
  let component: SelectedCourseComponent;
  let fixture: ComponentFixture<SelectedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
