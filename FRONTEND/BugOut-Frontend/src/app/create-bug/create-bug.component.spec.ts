import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBugComponent } from './create-bug.component';

describe('CreateBugComponent', () => {
  let component: CreateBugComponent;
  let fixture: ComponentFixture<CreateBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
