import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMenuComponent } from './item-menu.component';

describe('ItemMenuComponent', () => {
  let component: ItemMenuComponent;
  let fixture: ComponentFixture<ItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
