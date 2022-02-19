import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
// data received from @Output of recipe-list component
  constructor() { }

  ngOnInit(): void {
  }


}
