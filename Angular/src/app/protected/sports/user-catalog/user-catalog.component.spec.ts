import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatalogComponent } from './user-catalog.component';

describe('UserCatalogComponent', () => {
  let component: UserCatalogComponent;
  let fixture: ComponentFixture<UserCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCatalogComponent]
    });
    fixture = TestBed.createComponent(UserCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
