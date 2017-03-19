import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';

import { AuthEffects } from 'app/tutorial/tutorial.reducers';
import { rootReducer, AppState } from './app-reducer';

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(AuthEffects),
      ...(ENV === 'development' ? [StoreDevtoolsModule.instrumentOnlyWithExtension()] : [])
  ],
  declarations: [ ],
  exports: [ ]
})
export class AppStoreModule {
  constructor() {
    navToRouteFromState(initial_state);
  }
}

function navToRouteFromState(state: AppState) {
  if (state.router) {
    history.replaceState({}, null, state.router.path);
  }
}
