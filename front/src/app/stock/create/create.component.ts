import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/stock/services/article.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  errorMsg = '';
  f = this.fb.group({
    name: ['Truc', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    qty: [1, [Validators.required, Validators.min(0)]],
  });
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  async submit() {
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(this.f.value as NewArticle);
      await this.articleService.load();
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof Error) {
        this.errorMsg = err.message;
      }
    } finally {
      this.isAdding = false;
    }
  }
}
