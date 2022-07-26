import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehavioSubjetService } from "app/Services/behavio-subjet.service";
import { MethodeUsersService } from "app/Services/methode-users.service";

@Component({
  selector: "ajout-client",
  templateUrl: "./ajout-client.component.html",
  styleUrls: ["./ajout-client.component.css"],
})
export class AjoutClientComponent implements OnInit {
  addForm: FormGroup;
  erreurprenom = "";
  erreurnom = "";
  erreurtelephone = "";
  erreur = "";
  success = "";
  constructor(
    private formBuilder: FormBuilder,
    private methodeClient: MethodeUsersService,
    private behavioSubjet: BehavioSubjetService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
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
  }
  ajoutNouveauClient(): any {
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
    this.addForm.addControl('roles', new FormControl(['ROLE_CLIENT']));    
    this.methodeClient.addClient(this.addForm.value).subscribe(
      (data) => {
        this.erreur="";
        this.success = "NOUVEAU CLIENT AJOUTER AVEC SUCCESS";
        this.behavioSubjet.setValue(data);        
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
}
