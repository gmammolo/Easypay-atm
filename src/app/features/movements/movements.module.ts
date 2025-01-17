import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsComponent } from './movements.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared';
import {MatTableModule} from '@angular/material/table';
import { AtmNamePipe } from './pipes/atm-name.pipe';
import { FilterMovementsPipe } from './pipes/filter-movements.pipe';


@NgModule({
  declarations: [MovementsComponent, AtmNamePipe, FilterMovementsPipe],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MatTableModule,
  ]
})
export class MovementsModule { }
