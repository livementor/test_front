import { vuexfireMutations } from "vuexfire";
import { INotification } from "@/models/notification";

export interface IState {
  locale: string;
  notification?: INotification;
  locales: Array<string>;
  conversations?: Map<string, any>;
  users?: Map<string, any>;
  authUser?: string;
}

export const state = (): IState => ({
  locales: ["en", "fr"],
  locale: "fr",
  notification: undefined,
  authUser: undefined,
});

export const getters = {
  getNotification(state: IState) {
    return state.notification;
  },
  getLocales(state: IState) {
    return state.locales;
  },
  getLocale(state: IState) {
    return state.locale;
  },
};

export const mutations = {
  ...vuexfireMutations,
  SET_NOTIFICATION: (state: IState, payload?: INotification) => {
    state.notification = payload;
  },
  SET_AUTH_USER(state: IState, id: string) {
    state.authUser = id;
  },
  SET_LOCALE_INTERFACE(state: IState, locale: string) {
    state.locale = locale;
  },
};

export const actions = {
  showNotification(store: any, payload: any) {
    store.commit("SET_NOTIFICATION", payload);
  },
  hideNotification(store: any) {
    store.commit("SET_NOTIFICATION", undefined);
  },
  setAuthUser(store: any, id: string) {
    store.commit("SET_AUTH_USER", id, { root: true });
  },
  setLocaleInterface(store: any, locale: string) {
    store.commit("SET_LOCALE_INTERFACE", locale);
  },
};
