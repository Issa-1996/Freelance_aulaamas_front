import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModele } from 'app/Modeles/ClientModele';
import { BehavioSubjetService } from 'app/Services/behavio-subjet.service';
import { MethodeUsersService } from 'app/Services/methode-users.service';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css']
})
export class ModifierClientComponent implements OnInit {

  addForm: FormGroup;
  erreurprenom = "";
  erreurnom = "";
  erreurtelephone = "";
  erreur = "";
  success = "";
  data: ClientModele;
  constructor(
    private transferData: TransferDataService,
    private formBuilder: FormBuilder,
    private behavioSubjet: BehavioSubjetService,
    private methodeClient: MethodeUsersService
  ) { }

  ngOnInit(): void {    
    this.addForm = this.formBuilder.group({
      id:[""],
      prenom: ["", Validators.required],
      nom: ["", Validators.required],
      telephone: ["", Validators.required],
      mancheClient: [""],
      epauleClient: [""],
      couClient: [""],
      longueurBrasClient: [""],
      longueurPantalonClient: [""],
      cuisseClient: [""],
      hancheClient: [""],
      tourDeBrasClient: [""],
      tourDeTailleClient: [""],
      mancheProtrineClient: [""],
      ceintureClient: [""],
      poignetMachetClient: [""],
      BrasClient: [""],
      basClient: [""],
    });
    this.addForm.get("prenom").valueChanges.subscribe(() => {
      this.erreurprenom = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("nom").valueChanges.subscribe(() => {
      this.erreurnom = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("telephone").valueChanges.subscribe(() => {
      this.erreurtelephone = "";
      this.erreur = "";
      this.success = "";
    }); 
    this.addForm.patchValue(this.transferData.getData());
  }
  modifierClient(): any {
    if (this.addForm.get("prenom").value.trim() === "") {
      this.erreurprenom = "Prenom du client obligatoire !";
    }
    if (this.addForm.get("nom").value.trim() === "") {
      this.erreurnom = "Nom du client obligatoire !";
    }
    if (this.addForm.get("telephone").value.trim() === "") {
      this.erreurtelephone = "N° Telephone du client obligatoire !";
    }
    if (this.addForm.invalid) {
      return;
    }
    
    this.methodeClient.updateClient(this.addForm.value).subscribe(
      (data) => {
        this.erreur="";
        this.success = "CLIENT MODIFIER AVEC SUCCESS";
        this.behavioSubjet.setValue(data);        
      },
      (error) => {
        // @ts-ignore
        console.log(error);
        
        if (error.status === 403) {
          this.erreur = error.error;
        } else {
          this.success = "";
          this.erreur = "UNE ERREUR S'EST PRODUITE !";
        }
      }
    );
  }
}
