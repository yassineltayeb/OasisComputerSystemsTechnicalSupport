import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

// Import what you need. RECOMMENDED. ✔️
import {
  AccountBookFill, AlertFill, AlertOutline, UserOutline,
  LockOutline, LoginOutline, HomeOutline, FormOutline,
  BellOutline, SearchOutline, QuestionOutline, BarChartOutline,
  RightOutline, ReconciliationOutline, EditOutline, LogoutOutline,
  LoadingOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] =
  [
    AccountBookFill, AlertOutline, AlertFill, UserOutline,
    LockOutline, LoginOutline, HomeOutline, FormOutline,
    BellOutline, SearchOutline, QuestionOutline, BarChartOutline,
    RightOutline, ReconciliationOutline, EditOutline, LogoutOutline,
    LoadingOutline
  ];

@NgModule({
  exports: [
    CommonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzTableModule
  ],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
  ]
})
export default class NgZorroAntdesignModule { }
