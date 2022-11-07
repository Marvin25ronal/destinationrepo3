import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Email',
      urls: [{ title: 'Email', url: '/email' }, { title: 'Email' }],
    },
    component: EmailComponent,
  },
];

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [EmailComponent],
})
export class DashboardModule {}
