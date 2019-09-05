import * as Leaflet from 'leaflet';

import {Card} from '../../types'

interface Props {
  activeOffer?: Card
  offers: Array<Card>
  isOnPropertyPage: boolean
}

export default class Map extends React.PureComponent<Props> {
  leaflet: typeof Leaflet;
  icon: object;
  activeIcon: object;
  map: typeof Leaflet;
  markers: typeof Leaflet;

  constructor(props) {
    super(props);

    this.leaflet = Leaflet;

    this.icon = this.leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39],
      iconAnchor: [13, 39]
    });

    this.activeIcon = this.leaflet.icon({
      iconUrl: `img/pin-orange.svg`,
      iconSize: [27, 39],
      iconAnchor: [13, 39]
    });
  }

  render() {
    const {isOnPropertyPage} = this.props;
    return (
      <section className={`${isOnPropertyPage ? `property__map` : `cities__map`} map`} id="map"/>
    );
  }

  componentDidMount() {
    const {offers, activeOffer, isOnPropertyPage} = this.props;

    this.map = this.leaflet.map(`map`, {
      center: [offers[0].city.location.latitude, offers[0].city.location.longitude],
      zoom: offers[0].city.location.zoom,
      zoomControl: false,
      scrollWheelZoom: false,
      layers: new this.leaflet.TileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    }, 100);

    this.markers = this.leaflet.layerGroup().addTo(this.map);
    this._addMarkers(offers, this.markers);

    if (activeOffer && isOnPropertyPage) {
      this._addActiveMarker(activeOffer, this.markers)
    } else if (activeOffer) {
      this._activateMarker(this.map, activeOffer, this.markers)
    }
  }

  componentDidUpdate() {
    const {offers, activeOffer, isOnPropertyPage} = this.props;

    if (this.map) {
      this.markers.clearLayers();
      this._addMarkers(offers, this.markers);

      if (activeOffer && isOnPropertyPage) {
        this._addActiveMarker(activeOffer, this.markers)
      } else if (activeOffer) {
        this._activateMarker(this.map, activeOffer, this.markers)
      } else {
        this.map.setView([offers[0].city.location.latitude, offers[0].city.location.longitude], offers[0].city.location.zoom);
      }
    }
  }

  _addMarkers(cards, group) {
    cards.map((card) => {
      this.leaflet.marker([card.location.latitude, card.location.longitude], {icon: this.icon, interactive: false}).addTo(group);
    });
  }

  _addActiveMarker(card, group) {
    this.leaflet.marker([card.location.latitude, card.location.longitude], {icon: this.activeIcon, interactive: false}).addTo(group);
  }

  _activateMarker(map, offer, group) {
    map.setView([offer.location.latitude, offer.location.longitude], offer.location.zoom);
    this._addActiveMarker(offer, group);
  }
}
