import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationTypeCatalogComponent } from './justification-type-catalog.component';

describe('JustificationTypeCatalogComponent', () => {
  let component: JustificationTypeCatalogComponent;
  let fixture: ComponentFixture<JustificationTypeCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JustificationTypeCatalogComponent]
    });
    fixture = TestBed.createComponent(JustificationTypeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
