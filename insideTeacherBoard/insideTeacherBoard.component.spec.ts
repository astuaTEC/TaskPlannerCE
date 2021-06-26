import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideTeacherBoardComponent } from './insideTeacherBoard.component';

describe('InsideTeacherBoardComponent', () => {
  let component: InsideTeacherBoardComponent;
  let fixture: ComponentFixture<InsideTeacherBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideTeacherBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideTeacherBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
