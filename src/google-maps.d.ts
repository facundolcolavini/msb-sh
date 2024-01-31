// En un archivo .d.ts, por ejemplo, google-maps.d.ts
export {};

declare global {
  interface Window {
    myMapInstance?: google.maps.Map;
    initMap: () => void;
  }
}
