import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehavioSubjetService } from 'app/Services/behavio-subjet.service';
import { MethodeDepenseService } from 'app/Services/methode-depense.service';

@Component({
  selector: 'nouveau-depense',
  templateUrl: './nouveau-depense.component.html',
  styleUrls: ['./nouveau-depense.component.css']
})
export class NouveauDepenseComponent implements OnInit {

  addForm: FormGroup;
  erreur = "";
  success = "";
  erreurtype = "";
  erreurlibelle = "";
  erreurmontant = "";
  erreurdate = "";
  erreurdescription = "";
  constructor(
    private formBuilder: FormBuilder,
    private methodeDepense: MethodeDepenseService,
    private behavioSubjet: BehavioSubjetService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      type: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required],
      description: [""],
      date: ["", Validators.required],
    });
    this.addForm.get("type").valueChanges.subscribe(() => {
      this.erreurtype = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("libelle").valueChanges.subscribe(() => {
      this.erreurlibelle = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("prix").valueChanges.subscribe(() => {
      this.erreurmontant = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("date").valueChanges.subscribe(() => {
      this.erreurdate = "";
      this.erreur = "";
      this.success = "";
    });
  }
  ajoutNouveauDepense(): any {
    if (this.addForm.get("type").value.trim() === "") {
      this.erreurtype = "Type du dépense obligatoire !";
    }
    if (this.addForm.get("libelle").value.trim() === "") {
      this.erreurlibelle = "Libelle du model obligatoire !";
    }
    if (this.addForm.get("prix").value.trim() === "") {
      this.erreurmontant = "Montant du dépense obligatoire !";
    }
    if (this.addForm.get("date").value.trim() === "") {
      this.erreurdate = "Date du dépense obligatoire !";
    }
    if (this.addForm.invalid) {      
      return;
    }
    this.methodeDepense.addDepense(this.addForm.value).subscribe(
      (data) => {
        this.behavioSubjet.setValue(data);
        this.erreur="";
        this.success = "NOUVEAU DEPENSE AJOUTER AVEC SUCCESS";
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
