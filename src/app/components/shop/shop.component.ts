import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private slService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    );
    this.loggingService.printLog('Hello from Shop component on init');
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
