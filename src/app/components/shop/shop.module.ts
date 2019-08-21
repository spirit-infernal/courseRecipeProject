import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShopComponent } from './shop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ShopComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShopComponent }
    ]),
    SharedModule
  ]
})
export class ShopModule {}
