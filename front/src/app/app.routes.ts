import { Routes } from '@angular/router'

import { AuthGuard } from './guard/auth.guard'
import { UnauthGuard } from './guard/unauth.guard'
import {
  HomeComponent, LoginComponent, NotFoundComponent, PostCreateComponent,
  PostListComponent, PostShowComponent, ProfileComponent, RegisterComponent,
  TopicListComponent,
} from './pages'
import { PostResolver } from './resolvers'

export const redirectUrls = {
  home: '',
  posts: '/posts',
  login: '/login',
  register: '/register',
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
    path: 'topics',
    canActivate: [AuthGuard],
    title: 'Sujets',
    component: TopicListComponent,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    title: 'Articles',
    component: PostListComponent,
    data: {
      reuse: true,
    },
  },
  {
    path: 'posts/create',
    canActivate: [AuthGuard],
    title: 'Créer un article',
    component: PostCreateComponent,
  },
  {
    path: 'posts/:post',
    canActivate: [AuthGuard],
    title: 'Voir un article',
    component: PostShowComponent,
    resolve: {
      post: PostResolver,
    },
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    title: 'Mon compte',
    component: ProfileComponent,
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
]
