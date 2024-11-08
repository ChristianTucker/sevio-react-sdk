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
  debugEnabled?: boolean;
}

export interface SevioAdvertisement {
  zone: string;
  adType: AdType;
}

export type SevioPlacement = CommonSevioProperties & SevioAdvertisement;

export interface SevioContextProps extends CommonSevioProperties {
  initialized: boolean;
  advertisements: SevioAdvertisement[];
  setAdvertisements: (value: (((prevState: (SevioAdvertisement[])) => (SevioAdvertisement[])) | (SevioAdvertisement[]))) => void
  refreshZone: (zone: string) => void
  debugEnabled?: boolean;
}
