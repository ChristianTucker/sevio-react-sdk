import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import {
  SevioAdvertisement,
  SevioContextProps,
  SevioProviderProps,
} from './types';

export const SevioContext = createContext<SevioContextProps | undefined>(
  undefined
);

export function SevioProvider({
  accountId,
  inventoryId,
  debugEnabled,
  children,
}: PropsWithChildren<SevioProviderProps>) {
  // RATHER OR NOT THE SEVIO LOADER HAS BEEN INITIALIZED
  const [initialized, setInitialized] = useState<boolean>(false);
  // COLLECTION OF CURRENTLY ACTIVE ADVERTISEMENTS
  const [advertisements, setAdvertisements] = useState<SevioAdvertisement[]>([]);

  // WHENEVER ADVERTISEMENTS CHANGE, PUSH A NEW CONFIG TO SEVIO.
  useEffect(() => {
    if(!initialized) return;
    const placements = advertisements.map(advertisement => ({ ...advertisement, inventoryId, accountId }))

    console.log('Initialized', initialized, 'Sevioads', window.sevioads);

    window.sevioads.push(placements);
  }, [initialized, advertisements]);

  // VALIDATE PROPS
  if (!accountId)
    throw new Error('SevioProvider must be initialized with an accountId');
  if (!inventoryId)
    throw new Error('SevioProvider must be initialized with an inventoryId');

  // WHEN THE PROVIDER IS MOUNTED...
  useEffect(() => {
    // CREATE SCRIPT ELEMENT
    const script = document.createElement('script');

    // SET SCRIPT SOURCE TO THAT OF THE SEVIO LOADER.
    script.src = 'https://cdn.adx.ws/scripts/loader.js';

    // SET SCRIPT TO LOAD ASYNC
    script.async = true;

    // WAIT FOR THE SCRIPT TO LOAD
    script.onload = () => {
      if (debugEnabled)
        console.log('[DEBUG]: Sevioads loader successfully injected.');

      // DEFAULT THE INITIAL STATE TO PREVENT RACE CONDITIONS
      window.sevioads = window.sevioads ?? [];

      // SET INITIALIZED STATE TO TRUE, THIS WILL ALLOW ADVERTISEMENTS TO RENDER.
      setInitialized(true);
    };

    // PRINT TO THE CONSOLE ON FAILURE LOADING THE LOADER.
    script.onerror = () => {
      console.error(
        '[DEBUG]: Sevioads loader failed to load. Check the console for more information.'
      );
      setInitialized(false);
    };

    // MOUNT THE SCRIPT TO THE DOM, THIS WILL TRIGGER LOADING.
    document.head.appendChild(script);

    // IF PROVIDER IS UNMOUNTED, REMOVE THE SCRIPT FROM DOM.
    return () => {
      document.head.removeChild(script);
    };
  }, []);


  // REFRESHES A SPECIFIC ZONE, BY PUSHING IT AGAIN.
  const refreshZone = (zone: string) => {
    const current = advertisements.find(ad => ad.zone === zone);
    if(!current) throw new Error(`Cannot refresh non-existing zone: ${zone}`);
    window.sevioads.push([{ ...current, inventoryId, accountId }]);
  }


  return (
    <SevioContext.Provider
      value={{
        initialized,
        accountId,
        inventoryId,
        advertisements,
        setAdvertisements,
        debugEnabled,
        refreshZone
      }}
    >
      {children}
    </SevioContext.Provider>
  );
}
