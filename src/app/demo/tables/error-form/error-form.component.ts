// Angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';

export class FormInput {
  email!: string;
  password!: string;
  confirmPassword!: string;
  requiredInput!: string;
  url!: string;
  phone!: string;
  cmbGear!: string;
  address!: string;
  file!: string;
  switcher!: string;
}

@Component({
  selector: 'app-error-form',
  imports: [SharedModule, NarikCustomValidatorsModule],
  templateUrl: './error-form.component.html',
  styleUrl: './error-form.component.scss'
})
export class ErrorFormComponent implements OnInit {
  // private props
  formInput!: FormInput;
  form!: string;
  isSubmit: boolean;

  // Constructor
  constructor() {
    this.isSubmit = false;
  }

  // Life cycle events
  ngOnInit() {
    this.formInput = {
      email: '',
      password: '',
      confirmPassword: '',
      requiredInput: '',
      url: '',
      phone: '',
      cmbGear: '',
      address: '',
      file: '',
      switcher: ''
    };
  }

  // private method
  save(form: { valid: undefined }) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
  }
}
