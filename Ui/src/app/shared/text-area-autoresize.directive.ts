import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoresize]',
})
export class TextAreaAutoresizeDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.resize();
  }

  @HostListener('input')
  onInput() {
    this.resize();
  }

  resize() {
    this.elementRef.nativeElement.style.height = 'auto';
    this.elementRef.nativeElement.style.height =
      Math.min(this.elementRef.nativeElement.scrollHeight, 200) + 'px';
  }
}
