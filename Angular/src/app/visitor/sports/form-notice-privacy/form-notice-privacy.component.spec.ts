import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoticePrivacyComponent } from './form-notice-privacy.component';

describe('FormNoticePrivacyComponent', () => {
  let component: FormNoticePrivacyComponent;
  let fixture: ComponentFixture<FormNoticePrivacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNoticePrivacyComponent]
    });
    fixture = TestBed.createComponent(FormNoticePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
