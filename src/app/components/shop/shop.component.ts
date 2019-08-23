import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import * as shopStore from './store/shop.reducer';
import * as shopActions from './store/shop.actions';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[] }>;
  private subscription: Subscription;
  constructor(
    private slService: ShoppingListService,
    private store: Store<shopStore.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shopStore');
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
