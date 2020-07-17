import { ViewChild, AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  COLUMNS: string[] = Array.from({ length: 20 }, (v, k) => k + 1).map(v => 'COLUMN' + v)
  DATA = []

  //================================
  // For when we use the 
  // component in documentation
  //================================
  @Input()
  showRunSafetyStockButton: boolean = true

  query: string
  search() {
    this.dataSource.filter = this.query.trim().toLowerCase()
  }

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.DATA)

  constructor() {
    for (let i = 0; i < 2; i++) {
      let element = {}
      this.COLUMNS.forEach(c => {
        element[c] = c
      })
      this.DATA.push(element)
    }
  }

  ngOnInit() { }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isSticky(column: string): boolean {
    return ['COLUMN1', 'COLUMN2'].includes(column) ? true : false;
  }
}