import { useState } from 'react';
import { ElectronStoreKeyType } from '../../../main/main';

const getState = <T>(key: ElectronStoreKeyType, defaultValue: T) => {
  const store = window.electron.store;
  if (store.has(key)) return store.get(key) as T;
  return defaultValue;
};

export const useElectronStore = <T>(
  key: ElectronStoreKeyType,
  defaultValue: T,
) => {
  const store = window.electron.store;
  const [state, _setState] = useState<T>(() => getState(key, defaultValue));

  const setState = (payload: T) => {
    _setState(payload);
    store.set(key, payload);
  };

  return [state, setState] as [T, (payload: T) => void];
};
