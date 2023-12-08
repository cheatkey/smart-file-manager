import { useState } from 'react';

type KeyType = 'SAVE_PATH' | 'THUMBNAIL_PATH';

const getState = <T>(key: KeyType, defaultValue: T) => {
  const store = window.electron.store;
  if (store.has(key)) return store.get(key) as T;
  return defaultValue;
};

export const useElectronStore = <T>(key: KeyType, defaultValue: T) => {
  const store = window.electron.store;
  const [state, _setState] = useState<T>(() => getState(key, defaultValue));

  const setState = (payload: T) => {
    _setState(payload);
    store.set(key, payload);
  };

  return [state, setState] as [T, (payload: T) => void];
};
