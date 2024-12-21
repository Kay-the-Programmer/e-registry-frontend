import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileDialogComponent } from './create-file-dialog.component';

describe('CreateFileDialogComponent', () => {
  let component: CreateFileDialogComponent;
  let fixture: ComponentFixture<CreateFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFileDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
