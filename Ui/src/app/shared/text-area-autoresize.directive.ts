import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextAreaAutoresize]',
})
export class TextAreaAutoresizeDirective implements OnInit {
  private readonly maxHeight = 200

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  @HostListener('input')
  onInput() {
    this.resize();
  }

  resize() {
    this.elementRef.nativeElement.style.height = 'auto';
    this.elementRef.nativeElement.style.height = Math.min(
      this.elementRef.nativeElement.scrollHeight,
      this.maxHeight
    ) + 'px';
  }
}
