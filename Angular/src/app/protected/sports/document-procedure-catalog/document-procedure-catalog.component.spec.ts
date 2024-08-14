import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentProcedureCatalogComponent } from './document-procedure-catalog.component';

describe('DocumentProcedureCatalogComponent', () => {
  let component: DocumentProcedureCatalogComponent;
  let fixture: ComponentFixture<DocumentProcedureCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentProcedureCatalogComponent]
    });
    fixture = TestBed.createComponent(DocumentProcedureCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
