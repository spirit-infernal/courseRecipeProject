import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    );
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
