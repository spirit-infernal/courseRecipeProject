import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shopStore from '../../store/shop.reducer';
import * as shopActions from '../../store/shop.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscribtion: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<shopStore.AppState>) { }

  ngOnInit() {
    this.subscribtion = this.store
    .select('shopStore')
    .subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          ...this.editedItem
        });
        console.log(this.slForm);
      } else {
        this.editMode = false;
      }
    });
    // this.subscribtion = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       ...this.editedItem
    //     });
    //     console.log(this.slForm);
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new shopActions.UpdateIngredient(newIngredient)
      );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new shopActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new shopActions.StopEdit());
  }
  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new shopActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.store.dispatch(new shopActions.StopEdit());
  }
}
