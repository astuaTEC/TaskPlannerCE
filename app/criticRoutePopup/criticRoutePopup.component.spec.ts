import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticRoutePopupComponent } from './criticRoutePopup.component';

describe('CriticRoutePopupComponent', () => {
  let component: CriticRoutePopupComponent;
  let fixture: ComponentFixture<CriticRoutePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticRoutePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticRoutePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
