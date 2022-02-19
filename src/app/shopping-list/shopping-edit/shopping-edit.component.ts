import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.subscription = this.slService.startEditing
        .subscribe(
          (index: number) => {
            this.editItemIndex = index;
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index)
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        )
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
