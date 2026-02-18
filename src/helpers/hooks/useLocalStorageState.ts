import {useCallback, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const setStore = (key: string, value: any) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
};

const getStore = async (key: string) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
    return undefined;
  } catch (_) {
    return undefined;
  }
};

function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
): [T, (val: T) => void, boolean, () => Promise<T>] {
  const [state, setState] = useState<T>(defaultValue);
  const [isInit, setIsInit] = useState(false);

  const setValue = useCallback(
    (val: T) => {
      setState(val);
      setStore(key, val);
    },
    [key],
  );

  const getValue = useCallback(async () => {
    const result: T = await getStore(key);
    if (result) {
      setState(result);
    }
    return result;
  }, [key]);

  const init = useCallback(async () => {
    const result = await getStore(key);
    if (result) {
      setState(result);
    }
    setIsInit(true);
  }, [key]);

  useEffect(() => {
    if (!isInit) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit]);

  return [state, setValue, isInit, getValue];
}

export default useLocalStorageState;
