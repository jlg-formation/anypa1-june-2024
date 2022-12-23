import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faRotateRight = faRotateRight;

  constructor() {}

  ngOnInit(): void {}
}
