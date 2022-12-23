import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faRotateRight = faRotateRight;

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      this.articleService.load();
    }
  }
}
