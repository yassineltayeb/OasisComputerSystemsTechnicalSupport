import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsFollowUpComponent } from './tickets-follow-up.component';

describe('TicketsFollowUpComponent', () => {
  let component: TicketsFollowUpComponent;
  let fixture: ComponentFixture<TicketsFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
