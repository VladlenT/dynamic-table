import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneComponent {
  @Output() fileDrop = new EventEmitter<File>();

  isHovering = false;

  constructor() {}
}
