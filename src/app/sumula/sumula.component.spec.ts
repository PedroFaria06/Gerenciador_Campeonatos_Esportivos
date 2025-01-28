import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumulaComponent } from './sumula.component';

describe('SumulaComponent', () => {
  let component: SumulaComponent;
  let fixture: ComponentFixture<SumulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumulaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
