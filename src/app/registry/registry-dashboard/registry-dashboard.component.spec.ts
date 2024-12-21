import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryDashboardComponent } from './registry-dashboard.component';

describe('RegistryDashboardComponent', () => {
  let component: RegistryDashboardComponent;
  let fixture: ComponentFixture<RegistryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
