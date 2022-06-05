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

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  "blueberry",
  "lychee",
  "kiwi",
  "mango",
  "peach",
  "lime",
  "pomegranate",
  "pineapple",
];
const NAMES: string[] = [
  "Maia",
  "Asher",
  "Olivia",
  "Atticus",
  "Amelia",
  "Jack",
  "Charlotte",
  "Theodore",
  "Isla",
  "Oliver",
  "Isabella",
  "Jasper",
  "Cora",
  "Levi",
  "Violet",
  "Arthur",
  "Mia",
  "Thomas",
  "Elizabeth",
];

@Component({
  selector: "gestion-commande",
  templateUrl: "./gestion-commande.component.html",
  styleUrls: ["./gestion-commande.component.css"],
})
export class GestionCommandeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    "id",
    "prenom",
    "nom",
    "numero",
    "nomModel",
    "prix",
    "detail",
    "modifier",
    "imprimer",
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {}
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
  detail() {
    const dialogRef = this.dialog.open(DetailCommandeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  modifier() {
    const dialogRef = this.dialog.open(ModifierCommandeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ajout() {
    const dialogRef = this.dialog.open(NouveauCommandeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100000000).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
