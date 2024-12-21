import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoTrackerComponent } from './memo-tracker.component';

describe('MemoTrackerComponent', () => {
  let component: MemoTrackerComponent;
  let fixture: ComponentFixture<MemoTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoTrackerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
