import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-collapse',
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-collapse.component.html',
  styleUrls: ['./basic-collapse.component.scss']
})
export class BasicCollapseComponent implements OnInit {
  // private props
  isCollapsed!: boolean;
  multiCollapsed1!: boolean;
  multiCollapsed2!: boolean;

  panels = ['First', 'Second', 'Third'];

  // Life cycle events
  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }
}
