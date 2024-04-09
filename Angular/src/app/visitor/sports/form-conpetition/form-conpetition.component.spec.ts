import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConpetitionComponent } from './form-conpetition.component';

describe('FormConpetitionComponent', () => {
  let component: FormConpetitionComponent;
  let fixture: ComponentFixture<FormConpetitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormConpetitionComponent]
    });
    fixture = TestBed.createComponent(FormConpetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
