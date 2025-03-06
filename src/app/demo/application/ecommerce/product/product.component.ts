// angular import
import { Component, TemplateRef, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import { PlaceholderCard3Component } from 'src/app/theme/shared/components/placeholder-card/placeholder-3.component';

// bootstrap import
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, SharedModule, FilterComponent, PlaceholderCard3Component],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private offcanvasService = inject(NgbOffcanvas);
  router = inject(Router);
  private themeService = inject(ThemeService);
  isBox = BerryConfig.isBox_container;

  constructor() {
    effect(() => {
      this.rerenderChartOnContainerResize(this.themeService.isBoxLayout());
    });
  }

  private rerenderChartOnContainerResize(boxValue: boolean) {
    this.isBox = boxValue;
  }

  // public props
  isCollapsed = false;

  // public method
  products = [
    {
      img: 'assets/images/application/prod-img-1.jpg',
      name: 'Earl Garrett',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-2.jpg',
      name: 'Samuel Hampton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-3.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$29.99',
      mrp: '$36.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-4.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$49.99',
      mrp: '$85.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-5.jpg',
      name: 'Earl Garrett',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-6.jpg',
      name: 'Samuel Hampton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-7.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$29.99',
      mrp: '$36.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-8.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$49.9',
      mrp: '$85.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-1.jpg',
      name: 'Earl Garrett',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-2.jpg',
      name: 'Samuel Hampton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$12.99',
      mrp: '$15.99',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-3.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$29.99',
      mrp: '$36.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    },
    {
      img: 'assets/images/application/prod-img-4.jpg',
      name: 'Jimmy Morton',
      des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: '$49.99',
      mrp: '$85.00',
      rating: '(12.99+)',
      star: 'fas fa-star',
      star1: 'far fa-star',
      halfstar: 'fas fa-star-half-alt'
    }
  ];

  redirectPRoductDetails() {
    this.router.navigate(['/ec/ec-product-detail']);
  }

  showFilter(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
