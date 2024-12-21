import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrySidebarComponent } from './registry-sidebar.component';

describe('RegistrySidebarComponent', () => {
  let component: RegistrySidebarComponent;
  let fixture: ComponentFixture<RegistrySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrySidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
