import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetListComponent } from './bet-list.component';

describe('BetComponent', () => {
  let component: BetListComponent;
  let fixture: ComponentFixture<BetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
