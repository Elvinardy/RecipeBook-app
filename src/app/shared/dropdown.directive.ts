import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
@HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {  // to listen to mouse click event
    this.isOpen = !this.isOpen;
  }
}
