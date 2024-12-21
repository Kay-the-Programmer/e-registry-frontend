import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponseMemoComponent } from './componse-memo.component';

describe('ComponseMemoComponent', () => {
  let component: ComponseMemoComponent;
  let fixture: ComponentFixture<ComponseMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponseMemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponseMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
