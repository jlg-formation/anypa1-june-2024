import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: true,
  imports: [],
})
export default class LegalComponent implements OnInit {
  counter = signal(0);
  constructor() {}

  increment() {
    this.counter.set(this.counter() + 1);
  }

  ngOnInit(): void {}
}
