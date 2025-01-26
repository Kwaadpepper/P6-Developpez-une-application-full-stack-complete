import { Routes } from '@angular/router'

import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component'
import { HomeComponent } from './pages/home/home.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { CreatePostComponent } from './posts/create-post/create-post.component'
import { ListPostsComponent } from './posts/list-posts/list-posts.component'

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
export const routes: Routes = [
  {
    path: '',
    title: 'Bienvenue',
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'Se connecter',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Créer un compte',
    component: RegisterComponent,
  },
  {
    path: 'posts',
    title: 'Articles',
    component: ListPostsComponent,
  },
  {
    path: 'posts/create',
    title: 'Créer un article',
    component: CreatePostComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
]
