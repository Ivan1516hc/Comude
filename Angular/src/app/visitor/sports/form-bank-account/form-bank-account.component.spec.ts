import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBankAccountComponent } from './form-bank-account.component';

describe('FormBankAccountComponent', () => {
  let component: FormBankAccountComponent;
  let fixture: ComponentFixture<FormBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBankAccountComponent]
    });
    fixture = TestBed.createComponent(FormBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
