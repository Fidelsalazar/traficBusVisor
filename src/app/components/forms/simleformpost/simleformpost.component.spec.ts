import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimleformpostComponent } from './simleformpost.component';

describe('SimleformpostComponent', () => {
  let component: SimleformpostComponent;
  let fixture: ComponentFixture<SimleformpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimleformpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimleformpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
