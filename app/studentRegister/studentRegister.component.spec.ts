import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterComponent } from './studentRegister.component';

describe('StudentRegisterComponent', () => {
  let component: StudentRegisterComponent;
  let fixture: ComponentFixture<StudentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
