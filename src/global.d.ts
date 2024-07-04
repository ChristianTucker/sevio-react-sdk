import { SevioAdvertisement } from './context/types';

declare global {
  interface Window {
    sevioads: SevioAdvertisement[][];
  }
}
