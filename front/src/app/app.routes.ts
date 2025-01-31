import { Routes } from '@angular/router'

import { AuthGuard } from './guard/auth.guard'
import { UnauthGuard } from './guard/unauth.guard'
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { CreateComponent } from './pages/posts/create/create.component'
import { ListComponent } from './pages/posts/list/list.component'

export const redirectUrls = {
  posts: '/posts',
  login: '/login',
}

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
export const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    title: 'Bienvenue',
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [UnauthGuard],
    title: 'Se connecter',
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [UnauthGuard],
    title: 'Créer un compte',
    component: RegisterComponent,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    title: 'Articles',
    component: ListComponent,
  },
  {
    path: 'posts/create',
    canActivate: [AuthGuard],
    title: 'Créer un article',
    component: CreateComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
]
