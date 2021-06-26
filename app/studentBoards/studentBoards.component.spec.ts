import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBoardsComponent } from './studentBoards.component';

describe('StudentTablesComponent', () => {
  let component: StudentBoardsComponent;
  let fixture: ComponentFixture<StudentBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
