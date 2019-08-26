import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';
import * as shopActions from './store/shop.actions';
import * as fromApp from '../../store/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[] }>;
  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shop');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }
  onEditItem(index: number) {
    this.store.dispatch( new shopActions.StartEdit(index) );
    // this.slService.startedEditing.next(index);
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
