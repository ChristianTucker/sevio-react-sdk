import React from 'react';

export enum AdType {
  Native = 'native',
  Banner = 'banner',
}

interface CommonSevioProperties {
  accountId: string;
  inventoryId: string;
}

export interface SevioProviderProps extends CommonSevioProperties {
  debug?: boolean;
}

export interface SevioAdvertisement extends CommonSevioProperties {
  zone: string;
  adType: AdType;
}

export interface SevioContextProps extends CommonSevioProperties {
  initialized: boolean;
  advertisements: SevioAdvertisement[][];
  setAdvertisements: React.Dispatch<
    React.SetStateAction<SevioAdvertisement[][]>
  >;
  refreshZone: (adType: AdType, zone: string) => void;
}
