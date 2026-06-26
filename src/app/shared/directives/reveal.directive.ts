import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

/**
 * Reveal-on-scroll directive.
 *
 * Mirrors the design handoff behaviour: elements start hidden
 * (`opacity:0; translateY(20px)` via the global `.reveal` class) and
 * fade/slide in when they enter the viewport. Uses IntersectionObserver
 * (threshold .1, rootMargin `0px 0px -7% 0px`). Stagger is applied with
 * the `d1`–`d5` delay classes in the template.
 *
 * Usage:  <div appReveal class="d2"> … </div>
 *
 * Honours `prefers-reduced-motion` and environments without
 * IntersectionObserver by showing the content immediately.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private io?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      node.classList.add('in');
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            this.io?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' }
    );

    this.io.observe(node);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
