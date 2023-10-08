import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapviewFuncionarioComponent } from './mapview-funcionario.component';

describe('MapviewFuncionarioComponent', () => {
  let component: MapviewFuncionarioComponent;
  let fixture: ComponentFixture<MapviewFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapviewFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapviewFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
