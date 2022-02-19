import { Component, OnInit, Input } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: Number;
 // this eventEmitter won't pass any information -void
  // @Output so that we can listen to this event from outside this component

  ngOnInit() {
  }

}
