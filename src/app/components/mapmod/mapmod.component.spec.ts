
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmodComponent } from './mapmod.component';

describe('MapmodComponent', () => {
  let component: MapmodComponent;
  let fixture: ComponentFixture<MapmodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapmodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
