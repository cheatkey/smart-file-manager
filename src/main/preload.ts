// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPC_CONTROLLER_TYPE } from './ipcController';

export type Channels = 'ipc-example' | 'call-main-function';

const electronHandler = {
  store: {
    has(key: string) {
      return ipcRenderer.sendSync('electron-store-has', key);
    },
    get(key: string) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },

  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    invoke: <ChannelType extends keyof IPC_CONTROLLER_TYPE>(
      channel: ChannelType,
      args: Parameters<IPC_CONTROLLER_TYPE[ChannelType]>[0],
    ): Promise<ReturnType<IPC_CONTROLLER_TYPE[ChannelType]>> => {
      return ipcRenderer.invoke(channel, args);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
