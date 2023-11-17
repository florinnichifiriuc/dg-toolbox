import {NgModule} from '@angular/core';
import {ChangelogComponent} from './component/changelog/changelog.component';
import {BrowserModule} from "@angular/platform-browser";
import {ChangelogService} from "./service/changelog.service";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";


@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    )
  ],
  declarations: [
    ChangelogComponent
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule {
}
