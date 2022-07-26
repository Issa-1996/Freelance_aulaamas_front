import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehavioSubjetService } from 'app/Services/behavio-subjet.service';
import { MethodeModelService } from 'app/Services/methode-model.service';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'modifier-model',
  templateUrl: './modifier-model.component.html',
  styleUrls: ['./modifier-model.component.css']
})
export class ModifierModelComponent implements OnInit {

  addForm: FormGroup;
  erreurlibelle = "";
  erreurcathegorie = "";
  erreurprix = "";
  erreurdescription = "";
  erreurimages = "";
  erreur = "";
  success = "";
  constructor(
    private transferData: TransferDataService,
    private methodeModel: MethodeModelService,
    private behavioSubjet: BehavioSubjetService,
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
    this.addForm.get("cathegorie").valueChanges.subscribe(() => {
      this.erreurcathegorie = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("libelle").valueChanges.subscribe(() => {
      this.erreurlibelle = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("prix").valueChanges.subscribe(() => {
      this.erreurprix = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.get("descriptionModel").valueChanges.subscribe(() => {
      this.erreurdescription = "";
      this.erreur = "";
      this.success = "";
    });
    this.addForm.patchValue(this.transferData.getData());
  }
  modifierModel(): any {
    if (this.addForm.get("cathegorie").value.trim() === "") {
      this.erreurcathegorie = "Cathegorie du model obligatoire !";
    }
    if (this.addForm.get("libelle").value.trim() === "") {
      this.erreurlibelle = "Libelle du model obligatoire !";
    }
    if (this.addForm.get("descriptionModel").value.trim() === "") {
      this.erreurdescription = "Description du model obligatoire !";
    }
    if (this.addForm.get("prix").value.trim() === "") {
      this.erreurprix = "Prix du model obligatoire !";
    }
    if (this.addForm.invalid) {
      return;
    }
    this.methodeModel.updateModel(this.addForm.value).subscribe(
      (data) => {
        this.behavioSubjet.setValue(data);
        this.erreur="";
        this.success = "MODEL MODIFIER AVEC SUCCESS";
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
