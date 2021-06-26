import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardPopupComponent } from './newBoardPopup.component';

describe('NewBoardPopupComponent', () => {
  let component: NewBoardPopupComponent;
  let fixture: ComponentFixture<NewBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
