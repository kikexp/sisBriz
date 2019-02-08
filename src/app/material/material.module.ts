import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    Material.MatDatepickerModule,
    Material.MatFormFieldModule,
    Material.MatNativeDateModule,
    Material.MatInputModule,
    Material.MatCheckboxModule,
    Material.MatRadioModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatSelectModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatDialogModule,
    Material.MatCardModule
  ],
  exports: [
    Material.MatDatepickerModule,
    Material.MatFormFieldModule,
    Material.MatNativeDateModule,
    Material.MatInputModule,
    Material.MatCheckboxModule,
    Material.MatRadioModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatSelectModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatDialogModule,
    Material.MatCardModule
  ],
  declarations: []
})
export class MaterialModule { }
