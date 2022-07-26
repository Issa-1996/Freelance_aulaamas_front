import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModele } from 'app/Modeles/ClientModele';
import { ModelModele } from 'app/Modeles/ModelModele';
import { BehavioSubjetService } from 'app/Services/behavio-subjet.service';
import { MethodeCommandeService } from 'app/Services/methode-commande.service';
import { MethodeModelService } from 'app/Services/methode-model.service';
import { MethodeUsersService } from 'app/Services/methode-users.service';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'modifier-commande',
  templateUrl: './modifier-commande.component.html',
  styleUrls: ['./modifier-commande.component.css']
})
export class ModifierCommandeComponent implements OnInit {

  addForm: FormGroup;
  erreur = "";
  success = "";
  erreurnumeroCommande = "";
  erreurNumero = "";
  erreurtypeCommande = "";
  erreuruser = "";
  erreurnomCommande = "";
  erreurtypeDeTissuClient = "";
  erreurcouleurTissuClient = "";
  erreurtailleTissuClient = "";
  erreurmodel = "";
  erreurprix = "";
  erreuravance = "";
  erreurrelicat = "";
  erreurdateCommande = "";
  dataClient: ClientModele;
  dataModel: ModelModele;
  constructor(
    private formBuilder: FormBuilder,
    private methodeCommande: MethodeCommandeService,
    private methodeClient: MethodeUsersService,
    private methodeModele: MethodeModelService,
    private behavioSubjet: BehavioSubjetService,
    private transferData: TransferDataService
  ) {}

  ngOnInit(): void {    
    // console.log(this.transferData.getData());
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
    this.addForm.get("numeroCommande").valueChanges.subscribe(() => {
      this.erreurnumeroCommande = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("typeCommande").valueChanges.subscribe(() => {
      this.erreurtypeCommande = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("user").valueChanges.subscribe(() => {
      this.erreuruser = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("nomCommande").valueChanges.subscribe(() => {
      this.erreurnomCommande = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("model").valueChanges.subscribe(() => {
      this.erreurmodel = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("prix").valueChanges.subscribe(() => {
      this.erreurprix = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("dateCommande").valueChanges.subscribe(() => {
      this.erreurdateCommande = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.patchValue(this.transferData.getData());
  }
  modifierCommande() {
    if (this.addForm.get("numeroCommande").value.trim() === "") {
      this.erreurnumeroCommande = "Numero Commande  obligatoire !";
    }
    if (this.addForm.get("typeCommande").value.trim() === "") {
      this.erreurtypeCommande = "Type obligatoire !";
    }
    if (this.addForm.get("user").value.trim() === "") {
      this.erreuruser = "Client obligatoire !";
    }
    if (this.addForm.get("nomCommande").value.trim() === "") {
      this.erreurnomCommande = "Libelle obligatoire !";
    }
    if (this.addForm.get("model").value.trim() === "") {
      this.erreurmodel = "Model obligatoire !";
    }
    if (this.addForm.get("prix").value.trim() === "") {
      this.erreurprix = "Montant obligatoire !";
    }
    if (this.addForm.get("dateCommande").value.trim() === "") {
      this.erreurdateCommande = "Date de la commande obligatoire !";
    }
    if (this.addForm.invalid) {
      return;
    }
    this.methodeCommande.updateCommande(this.addForm.value).subscribe(
      (data) => {
        this.behavioSubjet.setValue(data);
        this.erreur = "";
        this.success = "COMMANDE MODIFIER AVEC SUCCESS";
      },
      (error) => {
        // @ts-ignore
        if (error.status === 403) {
          this.erreur = error.error;
        } else {
          this.success = "";
          this.erreur = "UNE ERREUR S'EST PRODUITE !";
        }
      }
    );
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
