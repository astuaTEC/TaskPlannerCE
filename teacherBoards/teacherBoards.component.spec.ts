import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBoardsComponent } from './teacherBoards.component';

describe('TeacherBoardsComponent', () => {
  let component: TeacherBoardsComponent;
  let fixture: ComponentFixture<TeacherBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
