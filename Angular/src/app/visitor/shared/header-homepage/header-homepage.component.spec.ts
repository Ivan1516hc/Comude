import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomepageComponent } from './header-homepage.component';

describe('HeaderHomepageComponent', () => {
  let component: HeaderHomepageComponent;
  let fixture: ComponentFixture<HeaderHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderHomepageComponent]
    });
    fixture = TestBed.createComponent(HeaderHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
