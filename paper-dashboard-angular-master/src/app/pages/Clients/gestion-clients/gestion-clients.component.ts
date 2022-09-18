import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClientModele } from "app/Modeles/ClientModele";
import { BehavioSubjetService } from "app/Services/behavio-subjet.service";
import { MethodeUsersService } from "app/Services/methode-users.service";
import { SearchService } from "app/Services/search.service";
import { TransferDataService } from "app/Services/transfer-data.service";
import { AjoutClientComponent } from "../ajout-client/ajout-client.component";
import { DetailClientComponent } from "../detail-client/detail-client.component";
import { ModifierClientComponent } from "../modifier-client/modifier-client.component";

@Component({
  selector: "gestion-clients",
  templateUrl: "./gestion-clients.component.html",
  styleUrls: ["./gestion-clients.component.css"],
})
export class GestionClientsComponent implements AfterViewInit, OnInit {
  dataClient: ClientModele[] = [];
  public role: any[];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<ClientModele>([]);
  search: string;
  constructor(
    private methodeClient: MethodeUsersService,
    public dialog: MatDialog,
    private behavioSubjet: BehavioSubjetService,
    private transferData: TransferDataService,
    private searchVS: SearchService
  ) {}
  ngOnInit(): void {
    const decodedToken = this.helper.decodeToken(localStorage.getItem("token"));
    this.role = decodedToken.roles;
    this.dataSource.paginator = this.paginator;
    this.listeClients();
  }
  detailInfoClient(element: any) {
    const dialogRef = this.dialog.open(DetailClientComponent);
    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierInfoClient(element: any) {
    const dialogRef = this.dialog.open(ModifierClientComponent);
    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ajoutNouveauClient() {
    const dialogRef = this.dialog.open(AjoutClientComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  listeClients() {
    var compt=0;
    this.methodeClient.getAllClient().subscribe((data) => {      
      this.dataClient = data["hydra:member"];
      for (let index = 0; index < this.dataClient.length; index++) {
        this.searchVS.currentSearch.subscribe((data: any) => {
          if (this.dataClient[index]["id"] == data["id"]) {
            this.dataClient[index] = data;
            this.dataSource = new MatTableDataSource<ClientModele>(this.dataClient);
            this.dataSource.paginator = this.paginator;
          }else{  
            if((data.length!=0)){
              if(this.dataClient.includes(data)){
                // console.log("OUIIII");
              }else if(!this.dataClient.includes(data)){
                compt++;
              }
            }
          }
          if(compt==this.dataClient.length){
            this.dataClient[index+1] = data;
            this.dataSource = new MatTableDataSource<ClientModele>(this.dataClient);
            this.dataSource.paginator = this.paginator;        
          }
        });
      }
      this.dataSource = new MatTableDataSource<ClientModele>(this.dataClient);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = [
    "id",
    "prenom",
    "nom",
    "telephone",
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
