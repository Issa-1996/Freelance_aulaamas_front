import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehavioSubjetService } from 'app/Services/behavio-subjet.service';
import { MethodeUsersService } from 'app/Services/methode-users.service';
import { TransferDataService } from 'app/Services/transfer-data.service';

@Component({
  selector: 'detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  addForm: FormGroup;
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
    this.addForm.patchValue(this.transferData.getData());
  }

}
