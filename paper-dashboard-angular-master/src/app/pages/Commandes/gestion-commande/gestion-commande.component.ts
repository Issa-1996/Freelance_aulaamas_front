import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { MatTableDataSource } from "@angular/material/table";
import { DetailCommandeComponent } from "../detail-commande/detail-commande.component";
import { ModifierCommandeComponent } from "../modifier-commande/modifier-commande.component";
import { NouveauCommandeComponent } from "../nouveau-commande/nouveau-commande.component";
import { CommandeModele } from "app/Modeles/CommandeModele";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MethodeCommandeService } from "app/Services/methode-commande.service";
import { BehavioSubjetService } from "app/Services/behavio-subjet.service";
import { TransferDataService } from "app/Services/transfer-data.service";

@Component({
  selector: "gestion-commande",
  templateUrl: "./gestion-commande.component.html",
  styleUrls: ["./gestion-commande.component.css"],
})
export class GestionCommandeComponent implements AfterViewInit, OnInit {

  dataCommande: CommandeModele[] = [];
  public role: any[];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<CommandeModele>([]);
  ngOnInit(): void {
    this.listeCommandes();
    // throw new Error('Method not implemented.');
  }
  constructor(
    public dialog: MatDialog,
    private methodeCommande: MethodeCommandeService,
    private behavioSubjet: BehavioSubjetService,
    private transferData: TransferDataService){}
  detailInfoCommande(element: CommandeModele) {
    const dialogRef = this.dialog.open(DetailCommandeComponent);

    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifierInfoCommande(element: CommandeModele) {
    const dialogRef = this.dialog.open(ModifierCommandeComponent);

    this.transferData.setData(element);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ajoutNouveauCommande() {
    const dialogRef = this.dialog.open(NouveauCommandeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  listeCommandes() {
    this.methodeCommande.getAllCommandes().subscribe((data) => {
      this.dataCommande = data["hydra:member"];
      this.behavioSubjet.getValue().subscribe((d) => {
        if (d.length != 0) {
          this.dataCommande.push(d);
        }
      });
      this.dataSource = new MatTableDataSource<CommandeModele>(this.dataCommande);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = ['id', 'prenom', 'nom', 'numeroCommande', 'model', 'prix', 'avance', 'relicat', 'detail', 'modifier', 'imprimer'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

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
  title = "export-table-data-to-pdf-using-jspdf-example";

  head = [["ID", "PRENOM", "NOM", "NUMERO", "MODEL", "PRIX"]];

  data = [[1, "ISSA", "SARR", "1234567876", "Tandance Korité", "125000"]];

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("My Team Detail", 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      // theme: "plain",
      // didDrawCell: (data) => {
      //   console.log(data.column.index);
      // },
    });

    // below line for Open PDF document in new tab
    doc.output("dataurlnewwindow");

    // below line for Download PDF document
    doc.save("recu de la commande.pdf");
  }
}