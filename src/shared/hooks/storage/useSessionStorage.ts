import useStorage from './useStorage';

function useSessionStorage<T = undefined>(
  key: string
): [T | undefined, (value?: T | ((previousState?: T) => T)) => void];

function useSessionStorage<T>(
  key: string,
  defaultValue: T | (() => T)
): [T, (value?: T | ((previousState?: T) => T)) => void];

function useSessionStorage<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorage(sessionStorage, key, defaultValue);
}

export default useSessionStorage;
