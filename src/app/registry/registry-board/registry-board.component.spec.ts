import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryBoardComponent } from './registry-board.component';

describe('RegistryBoardComponent', () => {
  let component: RegistryBoardComponent;
  let fixture: ComponentFixture<RegistryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
