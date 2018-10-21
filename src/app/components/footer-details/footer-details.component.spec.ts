import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDetailsComponent } from './footer-details.component';

describe('FooterDetailsComponent', () => {
  let component: FooterDetailsComponent;
  let fixture: ComponentFixture<FooterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
