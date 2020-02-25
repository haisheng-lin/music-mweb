import useStorage from './useStorage';

function useLocalStorage<T = undefined>(
  key: string
): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T)
): [T, (value?: T | ((previousState?: T) => T)) => void];

function useLocalStorage<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorage(localStorage, key, defaultValue);
}

export default useLocalStorage;
