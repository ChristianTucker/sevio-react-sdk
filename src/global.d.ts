import { SevioPlacement } from './context/types';

declare global {
  interface Window {
    sevioads: SevioPlacement[][];
  }
}
