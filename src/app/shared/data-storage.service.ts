import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../recipe/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-6bc23-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
    recipes)
    .subscribe(response => {
      console.log(response)
    });  // sending the http request
  }

  fetchRecipe() {
    // to tell typescript that the response will be an array of recipes
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-6bc23-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
      )
  }
}
