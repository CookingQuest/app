import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { rootReducer, AppState, actions, readInitialState } from 'reducers';
import { AuthEffects } from './tutorial/tutorial.reducers';
import { ApiService } from 'api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { TutorialComponent } from './tutorial';
import { UserComponent } from './user';

const APP_PROVIDERS = [
  ApiService
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    TutorialComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {}),
    StoreModule.provideStore(rootReducer, readInitialState()),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterStoreModule.connectRouter(),
    MaterialModule.forRoot(),
    EffectsModule.run(AuthEffects)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, private _store: Store<AppState>) {
    if (initial_state.router) {
      history.replaceState({}, null, initial_state.router.path);
    }
  }

  public hmrOnInit(store: any) {
    if (!store || !store.rootState) {
      return;
    }

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch(actions.setRootState(store.rootState));
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach((prop) => delete store[prop]);
  }

  public hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    this._store.take(1).subscribe((s) => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store: any) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
