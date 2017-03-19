import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { Store } from '@ngrx/store';

import { AppRoutingModule }   from './app-routing.module';
import { CoreModule } from './core';
import { ENV_PROVIDERS } from './environment';
import { HomeComponent } from './home';
import { SharedModule } from './shared';
import { AppStoreModule, AppState, actions, InternalStateType } from './store';
import { TutorialComponent } from './tutorial';

import { AppComponent } from './app.component';

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
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [
    ENV_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, private _store: Store<AppState>) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
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
