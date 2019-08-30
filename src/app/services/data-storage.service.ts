import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../components/recipes/store/recipes.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private store: Store<fromApp.AppState>
      ) {}

    storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put(
        'https://recipebookcourseproject-e958e.firebaseio.com/recipes.json', recipes
      ).subscribe(
        response => {
          console.log(response);
        }
      );
    }

    fetchRecipes() {
      return this.store.select('auth').pipe(
        take(1),
        map(authState => {
          return authState.user;
        }),
        exhaustMap(user => {
        return this.http.get<Recipe[]>('https://recipebookcourseproject-e958e.firebaseio.com/recipes.json', {
          params: new HttpParams().set('auth', user.token)
        });
      }) ,
      map(
        recipes => {
          return recipes.map(
            recipe => {
              return {
                ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            }
          );
        }
      ),
      tap(
        recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }
      ));
    }
}
