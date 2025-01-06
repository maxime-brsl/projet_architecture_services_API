import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSelectorComponent } from './competition-selector.component';

describe('CompetitionSelectorComponent', () => {
  let component: CompetitionSelectorComponent;
  let fixture: ComponentFixture<CompetitionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
