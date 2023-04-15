import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SortPipe } from '../directivas/sort.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
