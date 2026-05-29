import {
  AUTHENTICATION_PATHS,
  ERROR_PATHS,
  LEAD_PATHS,
  POKEMON_PATHS,
  ROOT_PATHS,
  USER_PATHS,
} from '~core/constants/paths.constants';

export const ROOT_URLS = {
  home: `/${ROOT_PATHS.home}`,
};

export const AUTH_URLS = {
  logIn: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.logIn}`,
  register: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.register}`,
  myAccount: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.myAccount}`,
};

export const POKEMON_URLS = {
  detail: (id: string) => `/${POKEMON_PATHS.base}/${id}`,
};

export const USER_URLS = {
  myPokemon: `/${USER_PATHS.base}/${USER_PATHS.myPokemon}`,
};

export const LEAD_URLS = {
  capture: `/${LEAD_PATHS.base}/${LEAD_PATHS.capture}`,
};

export const ERROR_URLS = {
  notFound: `/${ERROR_PATHS.base}/${ERROR_PATHS.notFound}`,
};
