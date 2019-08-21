import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-list/recipe-item/recipe-detail/recipe-detail.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
