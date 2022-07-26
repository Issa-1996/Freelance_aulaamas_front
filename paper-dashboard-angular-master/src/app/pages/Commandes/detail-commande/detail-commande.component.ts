import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientModele } from 'app/Modeles/ClientModele';
import { ModelModele } from 'app/Modeles/ModelModele';
import { MethodeModelService } from 'app/Services/methode-model.service';
import { MethodeUsersService } from 'app/Services/methode-users.service';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {

  addForm: FormGroup;
  success = "";
  dataClient: ClientModele;
  dataModel: ModelModele;
  constructor(
    private formBuilder: FormBuilder,
    private methodeClient: MethodeUsersService,
    private methodeModele: MethodeModelService,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {    
    this.listeClient();
    this.listeModel();
    this.addForm = this.formBuilder.group({
      id:[""],
      numeroCommande: [""],
      typeCommande: [""],
      user: [""],
      nomCommande: [""],
      typeDeTissuClient: [""],
      couleurTissuClient: [""],
      tailleTissuClient: [""],
      model: [""],
      prix: [""],
      avance: [""],
      relicat: [""],
      dateCommande: [""],
    });
    this.addForm.patchValue(this.transferData.getData());
  }
  listeClient(){
    this.methodeClient.getAllClient().subscribe(
      (data)=>{
        this.dataClient=data["hydra:member"];
      })
  }
  listeModel(){
    this.methodeModele.getAllModels().subscribe(
      (data)=>{
        this.dataModel=data["hydra:member"];
      })
  }
}
