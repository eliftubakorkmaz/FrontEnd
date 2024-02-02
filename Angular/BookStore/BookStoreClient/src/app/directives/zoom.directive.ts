import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {

  width: string = "";
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener("mouseenter") mouseenter() {
   this.renderer.addClass(this.el.nativeElement, 'zoom');
   const cardBody = this.el.nativeElement.querySelector('.detail');
   if (cardBody){
    this.renderer.addClass(cardBody, 'detail-show');
   }
  }

  @HostListener("mouseleave") mouseleave() {
    this.renderer.removeClass(this.el.nativeElement, 'zoom');
    const cardBody = this.el.nativeElement.querySelector('.detail');
   if (cardBody){
    this.renderer.removeClass(cardBody, 'detail-show');
   }
  }
    
} 
