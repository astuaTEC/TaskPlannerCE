import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardsPopupComponent } from './adminBoardsPopup.component';

describe('AdminBoardsPopupComponent', () => {
  let component: AdminBoardsPopupComponent;
  let fixture: ComponentFixture<AdminBoardsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoardsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
