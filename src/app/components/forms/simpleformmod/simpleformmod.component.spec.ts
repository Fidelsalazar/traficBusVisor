import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleformModComponent } from './simpleformmod.component';

describe('SimpleformComponent', () => {
  let component: SimpleformModComponent;
  let fixture: ComponentFixture<SimpleformModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleformModComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleformModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
