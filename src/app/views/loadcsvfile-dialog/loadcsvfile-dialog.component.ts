import { Component, OnInit, ViewChild } from "@angular/core";
import { Router }                       from "@angular/router";
import { FileUtil }                     from './file.util';
import { Constants }                    from './file.constants';
import { MySubscriptionService } from "../mysubscriptions/mysubscriptions.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from "@angular/material";
import { getLocaleMonthNames } from "@angular/common";
 
@Component({
    selector: 'loadcsvfile-dialog',
    templateUrl: './loadcsvfile-dialog.component.html',
    styleUrls: ['./loadcsvfile-dialog.component.scss'],
    providers : [ FileUtil, Constants]
})

export class LoadCsvFileDialog implements OnInit {

  @ViewChild('fileImportInput')
  fileImportInput: any;

  csvRecords = [];

  dateReport = "";

  constructor(private _router: Router,
    private myService : MySubscriptionService,
    private toastrService : ToastrService,
    private dialogRef: MatDialogRef<LoadCsvFileDialog>,

    private _fileUtil: FileUtil
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event): void {

    var text = [];
    var target = $event.target || $event.srcElement;
    var files = target.files; 

    if(Constants.validateHeaderAndRecordLengthFlag){
      if(!this._fileUtil.isCSVFile(files[0])){
        alert("Please import valid .txt file.");
        this.fileReset();
      }
    }

    var input = $event.target;

    var filename : string;
    filename = input.files[0].name;
    var year = filename.substr(11,4);
    var month = filename.substr(16,2);
    var day = filename.substr(19,2);
    this.dateReport = year + "-" + month + "-" + day;

    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      let csvData =  reader.result as string;
      let csvRecordsArray = csvData.split(/\r\n|\n/);

      var headerLength = -1;
      if(Constants.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length; 
      }
      
      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      
      if(this.csvRecords == null){
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }    
    }

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  };

  fileReset(){
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
    this.dataUploaded = false;
    this.dateReport = "";
  }

  isSubmit = false;
  dataUploaded = false;

  UploadData()
  {
      this.isSubmit = true;

      this.myService.uploadData(this.dateReport, this.csvRecords).subscribe(
        (data : number) => {
          if (data > 1)
          {
            this.toastrService.success(data.toString() +  " new records uploaded successfully","Success");
            this.dialogRef.close(true);
            
          }
          else if (data > 0)
          {
            this.toastrService.success("1 new record uploaded successfully","Success");
            this.dialogRef.close(true);
          }
          else
          {
            this.toastrService.success("Database is already up to date","No New Records Found");
          }
          this.isSubmit = false;
          this.dataUploaded = true;
        }
        ,error =>
        {
          this.toastrService.error("An Error Occured! Please Try Again","Error");
          this.isSubmit = false;
        }
      );
  }

}