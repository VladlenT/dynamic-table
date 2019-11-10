import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './pipes/highlight/highlight.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropzoneComponent } from './components/dropzone/dropzone.component';

@NgModule({
  declarations: [HighlightPipe, DropzoneComponent],
  imports: [CommonModule],
  exports: [
    HighlightPipe,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DropzoneComponent,
  ],
})
export class SharedModule {}
