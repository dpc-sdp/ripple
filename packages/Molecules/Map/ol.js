import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZSource from 'ol/source/XYZ'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import MVT from 'ol/format/MVT'
import WFS from 'ol/format/WFS'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import Zoom from 'ol/control/Zoom'
import Icon from 'ol/style/Icon'

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
