export const LOCAL_PATHS = {
  recommend: {
    routePath: '/recommend',
    getPathByParams: () => '/recommend'
  },
  singer: {
    list: {
      routePath: '/singer/list',
      getPathByParams: () => '/singer/list'
    },
    detail: {
      routePath: '/singer/detail/:id',
      getPathByParams: (singerId: string) => `/singer/detail/${singerId}`
    }
  },
  rank: {
    list: {
      routePath: '/rank/list',
      getPathByParams: () => '/rank/list'
    },
    detail: {
      routePath: '/rank/detail/:type',
      getPathByParams: (type: number) => `/rank/detail/${type}`
    }
  },
  search: {
    routePath: '/search',
    getPathByParams: () => '/search'
  }
};

// storage
export const STORATE_PLAY_LIST_KEY = 'music_mweb:play_list';
export const STORAGE_HISTORY_TERMS_KEY = 'music_mweb:history_terms';
export const STORAGE_FAVORITE_LIST_KEY = 'music_mweb:favorite_list';

// config
export const MAX_FAVORITE_LIST_LENGTH = 200;
