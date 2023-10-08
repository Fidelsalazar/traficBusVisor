import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmodalComponent } from './checkmodal.component';

describe('CheckmodalComponent', () => {
  let component: CheckmodalComponent;
  let fixture: ComponentFixture<CheckmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
