import { Component } from '@angular/core';
import * as jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular7-AddImageInPDF';
  fileName: string;
  filePreview: string

  constructor(private sanitizer: DomSanitizer) { }

  onFileChanged(event: { target: { files: any[]; }; }) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileName = file.name + " " + file.type;
        const doc = new jsPDF();
        const base64ImgString = (reader.result as string).split(',')[1];
        doc.addImage(base64ImgString, 15, 40, 50, 50);
        this.filePreview = 'data:image/png' + ';base64,' + base64ImgString;
        doc.save('TestPDF')
      };
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
