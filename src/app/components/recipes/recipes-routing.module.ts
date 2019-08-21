import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-list/recipe-item/recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {
      path: ':id',
      component: RecipeDetailComponent,
      resolve: [RecipesResolverService]},
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipesResolverService]},
  ] },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RecipesRoutingModule {}