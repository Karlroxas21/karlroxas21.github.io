import { Routes } from '@angular/router';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

export const routes: Routes = [
    {
        path: '', component: NavigationBarComponent,
        children: [
            
        ]
    }
];
