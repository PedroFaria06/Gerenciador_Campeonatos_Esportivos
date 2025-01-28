import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAndAthletesComponent } from './teams-and-athletes.component';

describe('TeamsAndAthletesComponent', () => {
  let component: TeamsAndAthletesComponent;
  let fixture: ComponentFixture<TeamsAndAthletesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsAndAthletesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsAndAthletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
