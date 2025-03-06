import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/theme/shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/theme/shared/models/product';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-product-add',
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productAddForm!: FormGroup;
  images: string[] = [
    'beyaz-ceket.jpg',
    'bol-siyah-jean.jpg',
    'den-pantolon.jpg',
    'gigi-jpg.jpg',
    'gri-ceket.jpg',
    'gri-jean.jpg',
    'kahve-ceket.jpg',
    'kirmizi-ceket.jpg',
    'mavi-ceket-jpg.jpg',
    'siyah-ceket.jpg',
    'siyah-jean.jpg',
    'yesil-ceket.jpg'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      colorName: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imagePath: ['', Validators.required]
    });
  }

  add() {
    if (this.productAddForm.valid) {
      const productModel: Product = Object.assign({}, this.productAddForm.value);
      
      this.productService.add(productModel).subscribe(
        (response: any) => {
          console.log('Product added successfully:', response);
          this.toastrService.success(response, "Success");
          this.productAddForm.reset();
        },
        error => {
          console.error('Error:', error);
          this.toastrService.error("An error occurred while adding the product", "Error");
        }
      );
    } else {
      this.toastrService.error("Please fill in all required fields", "Warning");
    }
  }
}