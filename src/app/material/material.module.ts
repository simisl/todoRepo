import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

const materialClasses = [
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatIconModule
]
@NgModule({
  imports: [ materialClasses ],
  exports: [ materialClasses ]
})
export class MaterialModule { }
