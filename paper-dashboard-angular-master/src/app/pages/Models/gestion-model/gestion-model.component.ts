import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ModelModele } from "app/Modeles/ModelModele";
import { BehavioSubjetService } from "app/Services/behavio-subjet.service";
import { MethodeModelService } from "app/Services/methode-model.service";
import { TransferDataService } from "app/Services/transfer-data.service";
import { DetailModelComponent } from "../detail-model/detail-model.component";
import { ModifierModelComponent } from "../modifier-model/modifier-model.component";
import { NouveauModelComponent } from "../nouveau-model/nouveau-model.component";
@Component({
  selector: "gestion-model",
  templateUrl: "./gestion-model.component.html",
  styleUrls: ["./gestion-model.component.css"],
})
export class GestionModelComponent implements AfterViewInit, OnInit {

  dataModel: ModelModele[] = [];
  public role: any[];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<ModelModele>([]);
  ngOnInit(): void {
    this.listeModels();
  }
  constructor(
    public dialog: MatDialog,
    private methodeModel: MethodeModelService,
    private behavioSubjet: BehavioSubjetService,
    private transferData: TransferDataService,
  ) {}
  detailInfoModel(element: ModelModele) {
    const dialogRef = this.dialog.open(DetailModelComponent);

    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierInfoModel(element: ModelModele) {
    const dialogRef = this.dialog.open(ModifierModelComponent);

    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ajoutNouveauModel() {
    const dialogRef = this.dialog.open(NouveauModelComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  listeModels() {
    this.methodeModel.getAllModels().subscribe((data) => {
      this.dataModel = data["hydra:member"];
      this.behavioSubjet.getValue().subscribe((d) => {
        if (d.length != 0) {
          this.dataModel.push(d);
        }
      });
      this.dataSource = new MatTableDataSource<ModelModele>(this.dataModel);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = [
    "id",
    "libelle",
    "prix",
    "image",
    "cathegorie",
    "detail",
    "modifier",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}