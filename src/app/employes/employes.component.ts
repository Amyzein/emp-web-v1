import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployesActionRendererComponent } from '../employes-action-renderer/employes-action-renderer.component';
//import {PartialEvaluator} from '@angular/compiler-cli/src/ngtsc/partial_evaluator';
import {GridOptions} from 'ag-grid-community';


// @ts-ignore
@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  //empoyees grid params
  @ViewChild('agGrid') agGrid: AgGridAngular;
  private gridApi;
  public context;
  public frameworkComponents;
  public columnDefs;
  public employies: any;
  public employe: any;
  private gridOptins: Partial<GridOptions>;
  submitted = false;



  public mode = 'lister'; //affichage, ajouter, modifier, supprimer


  constructor(private httpClient: HttpClient, private dialog: MatDialog) {

    this.columnDefs = [
      {headerName: 'ID', field: 'idEmploye', sortable: true, filter: true},
      {headerName: 'Nom', field: 'nom', sortable: true, filter: true},
      {headerName: 'Prenom', field: 'prenom', sortable: true, filter: true},
      {headerName: 'Contact', field: 'contact', sortable: true, filter: true},
      {headerName: 'Titre', field: 'titre', sortable: true, filter: true},
      {headerName: 'Adresse', field: 'adresse', hide: true},
      {headerName: 'Etat', field: 'etat', hide: true},
      {headerName: 'Situation Familialle', field: 'situationFamilialle', hide: true},
      {headerName: 'Email', field: 'email', hide: true},
      {headerName: 'Genre', field: 'Genre', hide: true},
      {headerName: 'Numero de Compte', field: 'numeroCompte', hide: true},
      {
        headerName: 'Action',
        cellRenderer: 'employesActionRenderer',
      },
    ];

    this.context = {componentParent: this};
    this.frameworkComponents = {
      employesActionRenderer: EmployesActionRendererComponent,
    };

    this.gridOptins = {

      cacheBlockSize:90,
      paginationPageSize: 5,
      pagination: true
    }

  }

  ngOnInit(): void {
    //this.rowData = this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData');
  }

  // tslint:disable-next-line:typedef
  onGetEmployes() {
    this.mode = 'lister';
    this.httpClient.get('http://localhost:8181/employes')
      .subscribe(data => {
        this.employies = data;
      }, err => {
        console.log(err);
      },);
  }

  onBtnExport() {
    let exportParams = {
      "fileName": "employees.csv",
      "allColumns": true
    }
    this.gridApi.exportDataAsCsv(exportParams);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  postEmployee() {
    this.httpClient.post('http://localhost:8181/listemployes', this.employe)
      .subscribe(data => {
        //this.employer = data;
        console.log("l'employee a ete ajouter !!")
        this.submitted = true;
      }, err => {
        console.log(err);
      },);
  }

  ajouterEmployer() {
    this.mode = 'ajouter'
    this.submitted = false;
    this.employe = {
      "nom": '',
      "prenom": '',
      "adresse": "",
      "contact": "",
      "etat": 1,
      "titre": "",
      "situationFamilialle": "",
      "email": "",
      "genre": "femme",
      "numeroCompte": null,
      "nni": null
    }
  }

  afficherEmployer(employe) {
    this.employe = employe;
    this.mode = 'afficher';
  }

  modifierEmployer(employe) {
    this.employe = employe;
    this.submitted = false;
    this.mode = 'modifier';
  }

  putEmployee() {
    this.httpClient.put('http://localhost:8181/listemployes/' + this.employe.idEmploye, this.employe)
      .subscribe(data => {
        //this.employer = data;
        console.log("l'employee a ete mis a jour !!")
        this.submitted = true;
      }, err => {
        console.log(err);
      },);
  }

  supprimerEmployer(employe) {
    this.employe = employe;
    //this.mode = 'supprimer'
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confimer la suppression',
        message: 'Etes vous sure de vouloir supprimer l\'employe ' + this.employe.nom + ' ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("Employee delete confirmed");
        this.deleteEmployee()
      }
    });

  }

  deleteEmployee() {
    this.httpClient.delete('http://localhost:8181/listemployes/' + this.employe.idEmploye)
      .subscribe(data => {
        //this.employer = data;
        console.log("l'employe a ete supprimer !!")
        this.submitted = true;
        this.mode = 'supprimer'
      }, err => {
        this.submitted = false;
        console.log(err);
      },);
  }


}
