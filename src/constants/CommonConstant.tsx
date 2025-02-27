export const MAX_CUSTOMERS = 10;

export const DEFAULT_TABS = [
  { id: 0, label: '고객조회', closeable: false },
  { id: 1, label: '요금제/부가서비스 변경', closeable: true },
  { id: 2, label: '신규가입', closeable: true },
];

export const SUBSCRIPTION_MENUS = [
  { id: 'NEW_SUBSCRIPTION', name: '신규가입' },
  { id: 'SERVICE_MODIFICATION', name: '요금제/부가서비스 변경' },
];

export enum MainMenu {
  HOME = 'home',
  MENU = 'menu',
  BOOKMARKS = 'bookmarks',
}

export const ROLE_SEARCH_TEL_NO = 'ROLE_SEARCH_TEL_NO';
export const ROLE_UNMASKING = 'ROLE_UNMASKING';
