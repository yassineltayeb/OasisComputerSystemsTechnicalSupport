import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

// Import what you need. RECOMMENDED. ✔️
import {
  AccountBookFill, AlertFill, AlertOutline, UserOutline,
  LockOutline, LoginOutline, HomeOutline, FormOutline,
  BellOutline, SearchOutline, QuestionOutline, BarChartOutline,
  RightOutline, ReconciliationOutline, EditOutline, LogoutOutline,
  LoadingOutline, SettingOutline, PlusOutline
} from '@ant-design/icons-angular/icons';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

const icons: IconDefinition[] =
  [
    AccountBookFill, AlertOutline, AlertFill, UserOutline,
    LockOutline, LoginOutline, HomeOutline, FormOutline,
    BellOutline, SearchOutline, QuestionOutline, BarChartOutline,
    RightOutline, ReconciliationOutline, EditOutline, LogoutOutline,
    LoadingOutline, SettingOutline, PlusOutline
  ];

@NgModule({
  exports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzTableModule,
    NzCollapseModule,
    NzSelectModule,
    NzPaginationModule
  ],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
})
export default class NgZorroAntdesignModule { }
