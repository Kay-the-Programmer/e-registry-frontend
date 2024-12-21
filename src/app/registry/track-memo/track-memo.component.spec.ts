import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMemoComponent } from './track-memo.component';

describe('TrackMemoComponent', () => {
  let component: TrackMemoComponent;
  let fixture: ComponentFixture<TrackMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackMemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
