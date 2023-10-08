import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModfuncsrouteComponent } from './modfuncsroute.component';

describe('ModfuncsrouteComponent', () => {
  let component: ModfuncsrouteComponent;
  let fixture: ComponentFixture<ModfuncsrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModfuncsrouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModfuncsrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
