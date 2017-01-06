import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { connect } from 'api/websocket';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { rootReducer, AppState, actions, initialState } from 'reducers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { UserComponent } from './user';

const APP_PROVIDERS = [
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {}),
        StoreModule.provideStore(rootReducer, initialState),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, private _store: Store<AppState>) {
        connect();
    }

    hmrOnInit(store) {
        if (!store || !store.rootState) return;

        // restore state by dispatch a SET_ROOT_STATE action
        if (store.rootState) {
            this._store.dispatch(actions.setRootState(store.rootState));
        }

        if ('restoreInputValues' in store) { store.restoreInputValues(); }
        this.appRef.tick();
        Object.keys(store).forEach(prop => delete store[prop]);
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        this._store.take(1).subscribe(s => store.rootState = s);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.restoreInputValues = createInputTransfer();
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}
