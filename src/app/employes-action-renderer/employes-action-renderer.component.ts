import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'child-cell',
  templateUrl: './employes-action-renderer.component.html',
  styleUrls: ['./employes-action-renderer.component.css']
})
export class EmployesActionRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public modifierEmployer() {
    console.log(this.params);
    this.params.context.componentParent.modifierEmployer(
      this.params.data
    );
  }

  public supprimerEmployer() {
    this.params.context.componentParent.supprimerEmployer(
      this.params.data
    );
  }

  public afficherEmployer() {
    this.params.context.componentParent.afficherEmployer(
      this.params.data
    );
  }

  refresh(): boolean {
    return false;
  }
}
