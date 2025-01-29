import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampeonatoComponent } from './campeonato.component';
import { CommonModule } from '@angular/common';

describe('CampeonatoComponent', () => {
  let component: CampeonatoComponent;
  let fixture: ComponentFixture<CampeonatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule], 
      declarations: [CampeonatoComponent],
    });
    fixture = TestBed.createComponent(CampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle times visibility', () => {
    const initialVisibility = component.campeonatos[0].timesVisiveis;
    component.toggleTimes(0);
    expect(component.campeonatos[0].timesVisiveis).toBe(!initialVisibility);
  });
});
