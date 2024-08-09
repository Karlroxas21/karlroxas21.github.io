import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '', component: NavigationBarComponent,
        children: [
            { path: '', component: HomeComponent},
        ]
    }
];
