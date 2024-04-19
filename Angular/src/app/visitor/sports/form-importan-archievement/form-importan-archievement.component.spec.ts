import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportanArchievementComponent } from './form-importan-archievement.component';

describe('FormImportanArchievementComponent', () => {
  let component: FormImportanArchievementComponent;
  let fixture: ComponentFixture<FormImportanArchievementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormImportanArchievementComponent]
    });
    fixture = TestBed.createComponent(FormImportanArchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
