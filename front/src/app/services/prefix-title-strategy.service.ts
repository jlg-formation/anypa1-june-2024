import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrefixTitleStrategyService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`Gestion Stock : ${title}`);
    }
  }
}
