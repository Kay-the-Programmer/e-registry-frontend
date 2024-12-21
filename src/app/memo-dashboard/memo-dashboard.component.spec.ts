import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoDashboardComponent } from './memo-dashboard.component';

describe('MemoDashboardComponent', () => {
  let component: MemoDashboardComponent;
  let fixture: ComponentFixture<MemoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
