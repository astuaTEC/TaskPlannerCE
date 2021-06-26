import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideStudenBoardComponent } from './insideStudentBoard.component';

describe('InsideStudenBoardComponent', () => {
  let component: InsideStudenBoardComponent;
  let fixture: ComponentFixture<InsideStudenBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsideStudenBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideStudenBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
