import 'ol/ol.css'
import TileLayer from 'ol/layer/tile'
import VectorTileLayer from 'ol/layer/vectortile'
import VectorTileSource from 'ol/source/vectortile'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import XYZSource from 'ol/source/xyz'
import Style from 'ol/style/style'
import Text from 'ol/style/text'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import MVT from 'ol/format/mvt'
import WFS from 'ol/format/wfs'
import Map from 'ol/map'
import View from 'ol/view'
import Feature from 'ol/feature'
import Overlay from 'ol/overlay'
import Zoom from 'ol/control/zoom'
import Icon from 'ol/style/icon'

const ol = {
  Map: Map,
  View: View,
  Overlay: Overlay,
  control: {
    Zoom
  },
  layer: {
    Tile: TileLayer,
    Vector: VectorLayer,
    VectorTile: VectorTileLayer
  },
  source: {
    Vector: VectorSource,
    VectorTile: VectorTileSource,
    XYZ: XYZSource
  },
  style: {
    Style: Style,
    Text: Text,
    Fill: Fill,
    Stroke: Stroke,
    Icon: Icon
  },
  format: {
    MVT: MVT,
    WFS: WFS
  },
  Feature: Feature
}
export default ol
