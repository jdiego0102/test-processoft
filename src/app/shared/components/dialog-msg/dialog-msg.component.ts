import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { QuotationResponse } from 'src/app/models/quotation.interface';

@Component({
  selector: 'app-dialog-msg',
  templateUrl: './dialog-msg.component.html',
  styleUrls: ['./dialog-msg.component.scss']
})
export class DialogMsgComponent implements OnInit {

  data: QuotationResponse;

  constructor( public dialogRef: MatDialogRef<DialogMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public msg: any,
    private _sanitizer: DomSanitizer
  ) {
    this.data = msg.data;
  }

  ngOnInit(): void {
  }

  getVideoIframe(url: any) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }


}
