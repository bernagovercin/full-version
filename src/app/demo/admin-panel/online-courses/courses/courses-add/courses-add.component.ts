// angular import
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { FileUploadModule, FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-courses-add',
  imports: [SharedModule, FileUploadModule],
  templateUrl: './courses-add.component.html',
  styleUrl: './courses-add.component.scss'
})
export class CoursesAddComponent {
  private filesControl = new FormControl<File[]>(null!, FileUploadValidators.filesLimit(2));
  demoForm = new FormGroup({
    files: this.filesControl
  });
}
