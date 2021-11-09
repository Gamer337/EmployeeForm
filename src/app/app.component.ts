import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';
import { NotifierService } from './notifier.service';

export type EditorType = 'name' | 'profileForm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  editor: EditorType = 'name';
  
  constructor(private oauthService:OAuthService, private notifierservice: NotifierService) {
    this.configureSingleSignOn();
  }

  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauthService.initImplicitFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims? claims : null;
  }

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profileForm';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
    this.notifierservice.showNotification('Add Employee', 'Ok');
  }
}
