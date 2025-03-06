import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-product-view',
  imports: [SharedModule, RouterModule],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  @ViewChild('carousel1') carousel1!: NgbCarousel;
  @ViewChild('carousel2') carousel2!: NgbCarousel;
  @ViewChild('carousel3') carousel3!: NgbCarousel;
  @ViewChild('carousel4') carousel4!: NgbCarousel;
  @ViewChild('carousel5') carousel5!: NgbCarousel;
  @ViewChild('carousel6') carousel6!: NgbCarousel;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  // Carousel control methods
  togglePaused(carousel: NgbCarousel) {
    if (this.paused) {
      carousel.cycle();
    } else {
      carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused(this.carousel1); // Veya ilgili carousel'i seçin
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused(this.carousel1); // Veya ilgili carousel'i seçin
    }
  }
}