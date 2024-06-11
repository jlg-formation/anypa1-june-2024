import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom, timer } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { JsonPipe } from '@angular/common';
import { getErrorMessage } from '../../../misc/error';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, JsonPipe],
})
export default class CreateComponent implements OnInit {
  errorMsg = '';
  f = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(10)]],
    price: [0, [Validators.required, Validators.min(0)]],
    qty: [1, [Validators.required, Validators.min(0)]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  getErrorMessage(control: FormControl) {
    return getErrorMessage(control);
  }

  ngOnInit(): void {}

  async submit() {
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(this.f.getRawValue());
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
