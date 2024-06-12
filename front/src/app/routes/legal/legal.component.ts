import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: true,
  imports: [],
})
export default class LegalComponent implements OnInit {
  counter = 0;
  constructor() {}

  increment() {
    this.counter++;
  }

  ngOnInit(): void {}
}
