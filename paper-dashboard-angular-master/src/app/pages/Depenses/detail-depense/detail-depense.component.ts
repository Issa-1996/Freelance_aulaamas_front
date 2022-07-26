import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'detail-depense',
  templateUrl: './detail-depense.component.html',
  styleUrls: ['./detail-depense.component.css']
})
export class DetailDepenseComponent implements OnInit {

  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private transferData: TransferDataService) { }

  ngOnInit(): void {   
    this.addForm = this.formBuilder.group({
      id:[""],
      type: [""],
      libelle: [""],
      prix: [""],
      description: [""],
      date: [""],
    });
    this.addForm.patchValue(this.transferData.getData());
  }

}
