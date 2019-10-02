import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() itemsTotal = 1;
  @Input() itemsPerPage = 1;
  @Input() currentPage = 1;
  @Input() href = '/';

  get pagesTotal() {
    return Math.ceil(this.itemsTotal / this.itemsPerPage);
  }

  get pages() {
    return new Array(this.pagesTotal).fill(0).map((e, i) => i + 1);
  }

  constructor() {}

  ngOnInit() {}
}
