import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocumentsComponent } from './form-documents.component';

describe('FormDocumentsComponent', () => {
  let component: FormDocumentsComponent;
  let fixture: ComponentFixture<FormDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDocumentsComponent]
    });
    fixture = TestBed.createComponent(FormDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
