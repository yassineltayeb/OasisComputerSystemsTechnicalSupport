import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsViewerComponent } from './tickets-viewer.component';

describe('TicketsViewerComponent', () => {
  let component: TicketsViewerComponent;
  let fixture: ComponentFixture<TicketsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
