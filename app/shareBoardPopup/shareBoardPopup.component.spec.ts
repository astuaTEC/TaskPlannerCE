import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBoardPopupComponent } from './shareBoardPopup.component';

describe('ShareBoardPopupComponent', () => {
  let component: ShareBoardPopupComponent;
  let fixture: ComponentFixture<ShareBoardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareBoardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBoardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
