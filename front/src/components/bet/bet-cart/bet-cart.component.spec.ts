import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetCartComponent } from './bet-cart.component';

describe('BetCartComponent', () => {
  let component: BetCartComponent;
  let fixture: ComponentFixture<BetCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
