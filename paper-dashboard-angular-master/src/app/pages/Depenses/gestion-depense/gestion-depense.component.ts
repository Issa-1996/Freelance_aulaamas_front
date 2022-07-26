import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DepenseModele } from 'app/Modeles/DepenseModele';
import { MethodeDepenseService } from 'app/Services/methode-depense.service';
import { TransferDataService } from 'app/Services/transfer-data.service';
import { DetailDepenseComponent } from '../detail-depense/detail-depense.component';
import { NouveauDepenseComponent } from '../nouveau-depense/nouveau-depense.component';
@Component({
  selector: 'gestion-depense',
  templateUrl: './gestion-depense.component.html',
  styleUrls: ['./gestion-depense.component.css']
})
export class GestionDepenseComponent implements AfterViewInit, OnInit {

  dataModel: DepenseModele[] = [];
  public role: any[];
  helper = new JwtHelperService();
  dataSource = new MatTableDataSource<DepenseModele>([]);
  ngOnInit(): void {
    this.listeDepenses();
  }
  constructor(
    public dialog: MatDialog,
    private methodeDepense: MethodeDepenseService,
    private transferData: TransferDataService){}
    detailInfoDepense(Depense: DepenseModele) {
    const dialogRef = this.dialog.open(DetailDepenseComponent);

    this.transferData.setData(Depense);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ajoutNouveauDepense() {
    const dialogRef = this.dialog.open(NouveauDepenseComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  listeDepenses() {
    this.methodeDepense.getAllDepenses().subscribe((data) => {
      this.dataModel = data["hydra:member"];
      this.dataSource = new MatTableDataSource<DepenseModele>(this.dataModel);
      this.dataSource.paginator = this.paginator;
    });
  }
  displayedColumns: string[] = ['id', 'type', 'libelle', 'montant', 'date', 'detail'];

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