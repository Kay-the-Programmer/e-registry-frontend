import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemosListComponent } from './memos-list.component';

describe('MemosListComponent', () => {
  let component: MemosListComponent;
  let fixture: ComponentFixture<MemosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
