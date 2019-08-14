import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Recipe } from "../../models/recipe.model";
import { DataStorageService } from "../../services/data-storage.service";
import { RecipeService } from "src/app/services/recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipeService.getRecipes();
      if(recipes.length === 0){
        return this.dataStorageService.fetchRecipes();
      } else {
        return recipes;
      }
    }
}
