import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDisplaySpacesComponent } from './mini-display-spaces.component';

describe('MiniDisplaySpacesComponent', () => {
  let component: MiniDisplaySpacesComponent;
  let fixture: ComponentFixture<MiniDisplaySpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniDisplaySpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniDisplaySpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
