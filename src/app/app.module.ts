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
import { rootReducer, AppState, actions, InternalStateType } from 'reducers';
import { AuthEffects } from './tutorial/tutorial.reducers';
import { ApiService } from 'api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { TutorialComponent } from './tutorial';
import { UserComponent } from './user';

const APP_PROVIDERS = [
  ApiService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

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
    StoreModule.provideStore(rootReducer, new AppState()),
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
    navToRouteFromState(initial_state);
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state by dispatch a SET_ROOT_STATE action
    this._store.dispatch(actions.setRootState(store.state));

    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    this._store.take(1).subscribe((s) => store.state = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

function navToRouteFromState(state: AppState) {
  if (state.router) {
    history.replaceState({}, null, state.router.path);
  }
}
