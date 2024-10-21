import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'posts', pathMatch: 'full'},
    {path: 'posts', loadComponent: () => import('./components/posts/posts.component').then(m => m.PostsComponent)},
    {path: 'users', loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent)},


];
