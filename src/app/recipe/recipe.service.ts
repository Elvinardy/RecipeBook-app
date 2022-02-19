import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  /* recipeSelected = new Subject<Recipe>(); */

  /* private recipes: Recipe[] = [
    new Recipe('Mee Goreng', 'Famous southeast asian noodle',
    '/assets/istockphoto-1358507648-612x612.jpeg', [
      new Ingredient('Noodle', 1),
      new Ingredient('Veggie', 3)
    ]),
    new Recipe('Nasi Lemak', 'coconut milk rice served with fish or chicken ',
    '/assets/istockphoto-526149515-612x612.jpeg',[
      new Ingredient('Rice', 1),
      new Ingredient('Santan', 4)
    ]),
    new Recipe('Roti Prata', 'A famous indian cuisine served with curry ',
    '/assets/istockphoto-460848421-1024x1024.jpeg',[
      new Ingredient('flour', 4),
      new Ingredient('yegg', 3)
    ])
  ];
 */

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {

  }

  getRecipes() {
    return this.recipes.slice();
    // only allow to get a  copy of the array, does not affect the actual one
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  // updating the fetch data from the database to the recipe service
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }
 }
