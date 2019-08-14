import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscribtion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscribtion = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          ...this.editedItem
        });
        console.log(this.slForm);
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
