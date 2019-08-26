import * as fromShop from '../components/shop/store/shop.reducer';
import * as fromAuth from '../components/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shop: fromShop.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shop: fromShop.shopReducer,
  auth: fromAuth.authReducer
};
