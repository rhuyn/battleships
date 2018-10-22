import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDisplayComponent } from './mini-display.component';

describe('MiniDisplayComponent', () => {
  let component: MiniDisplayComponent;
  let fixture: ComponentFixture<MiniDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
