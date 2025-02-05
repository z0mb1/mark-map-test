import { Map as OlMap, View, Overlay } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";

export class MapService {
  private map: OlMap;
  private markers: Map<string, Overlay> = new Map();
  chooseMarker: (id: string) => void;

  constructor(target: HTMLElement, chooseMarker: (id: string) => void) {
    this.map = new OlMap({
      target,
      layers: [new TileLayer({ source: new OSM() })],

      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
    this.chooseMarker = chooseMarker;
  }

  getMap() {
    return this.map;
  }

  centerMap(lon: number, lat: number, zoom = 14) {
    this.map.getView().setCenter(fromLonLat([lon, lat]));
    this.map.getView().setZoom(zoom);
  }

  addMarker({ id, lon, lat }: { id: string; lon: number; lat: number }) {
    this.removeMarker(id);

    const markerElement = this.createMarkerElement();
    const marker = new Overlay({
      position: fromLonLat([lon, lat]),
      element: markerElement,
    });

    this.map.addOverlay(marker);
    this.markers.set(id, marker);

    markerElement.addEventListener("click", () => this.chooseMarker(id));
  }

  removeMarker(id: string) {
    const marker = this.markers.get(id);
    if (marker) {
      this.map.removeOverlay(marker);
      marker.getElement()?.remove();
      this.markers.delete(id);
    }
  }

  private createMarkerElement(): HTMLElement {
    const markerElement = document.createElement("div");
    markerElement.style.width = "32px";
    markerElement.style.height = "32px";
    markerElement.style.position = "absolute";
    markerElement.style.transform = "translate(-50%, -100%)";
    const icon = document.createElement("img");
    icon.src = "/hydrant-fire-hydrant-svgrepo-com.svg";
    icon.style.width = "100%";
    icon.style.height = "100%";

    markerElement.appendChild(icon);
    return markerElement;
  }

  onClick(callback: (lon: number, lat: number) => void) {
    const clickHandler = (event: any) => {
      const [lon, lat] = toLonLat(event.coordinate);
      callback(lon, lat);
    };

    this.map.on("click", clickHandler);
    return clickHandler;
  }

  offClick(handler: any) {
    this.map.un("click", handler);
  }
}
