import { Component, ComponentFactoryResolver, ViewChild,  OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
    ) {}

    ngOnInit() {
      this.storeSub = this.store.select('auth').subscribe(
        authState => {
          this.isLoading = authState.loading;
          this.error = authState.authError;
          if(this.error) {
            this.showErrorAlert(this.error);
          }
        }
      );
    }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;

      if (this.isLoginMode) {
        this.store.dispatch(new authActions.LoginStart(
          {
            email: email,
            password: password
          }
        ));
      } else {
        this.store.dispatch(new authActions.SignupStart({email: email, password: password}));
      }
      form.reset();
    }
  }

  onHandleError() {
    this.store.dispatch(new authActions.ClearError());
  }
  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
    const alrtCmpFcatory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alrtCmpFcatory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
