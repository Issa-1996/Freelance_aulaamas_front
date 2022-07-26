import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'detail-model',
  templateUrl: './detail-model.component.html',
  styleUrls: ['./detail-model.component.css']
})
export class DetailModelComponent implements OnInit {

  addForm: FormGroup;
  constructor(
    private transferData: TransferDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id:[""],
      libelle: ["", Validators.required],
      descriptionModel: ["", Validators.required],
      cathegorie: ["", Validators.required],
      prix: ["", Validators.required],
      images: [""],
    });
    this.addForm.patchValue(this.transferData.getData());
    console.log(this.transferData.getData());
    
  }

}
