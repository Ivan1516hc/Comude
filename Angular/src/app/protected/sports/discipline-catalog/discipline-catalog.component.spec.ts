import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineCatalogComponent } from './discipline-catalog.component';

describe('DisciplineCatalogComponent', () => {
  let component: DisciplineCatalogComponent;
  let fixture: ComponentFixture<DisciplineCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineCatalogComponent]
    });
    fixture = TestBed.createComponent(DisciplineCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
