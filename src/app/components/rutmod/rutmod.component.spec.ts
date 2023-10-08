import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutmodComponent } from './rutmod.component';

describe('RutmodComponent', () => {
  let component: RutmodComponent;
  let fixture: ComponentFixture<RutmodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutmodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
