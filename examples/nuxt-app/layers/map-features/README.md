## About this layer

Components used to demonstrate various map features.

1. [components/global/VsbaMapPopupContent.vue](components/global/VsbaMapPopupContent.vue)<br> Map popup content component, added to mapConfig `popup` e.g.

    ```json
      "mapConfig": {
        "props": {
          "popup": {
            "content": {
              "component": "VSBAMapPopupContent"
            }
            ...
    ```

2. [components/global/VSBAProjectAreaLayer.vue](components/global/VSBAProjectAreaLayer.vue)<br> Vector layer, added to mapConfig `vectorLayorComponent` e.g.

    ```json
      "mapConfig": {
        "props": {
          "vectorLayerComponent": "VSBAProjectAreaLayer",
          ...
    ```

3. [components/global/test/TestMapPopupContent.vue](components/global/test/TestMapPopupContent.vue)
    ```json
      "mapConfig": {
        "props": {
          "popup": {
            "content": {
              "component": "TestMapPopupContent"
              ...
    ```

4. [components/global/test/TestMapShapeLayer.vue](components/global/test/TestMapShapeLayer.vue)
    ```json
      "mapConfig": {
        "props": {
          "vectorLayerComponent": "TestMapShapeLayer"
          ...
    ```

5. [components/global/test/TestMapSidepanelItem.vue](components/global/test/TestMapSidepanelItem.vue)
    ```json
      "mapConfig": {
        "sidePanel": {
          "enabled": false,
          "resultsComponent": "TestMapSidepanelItem",
          "itemIdObjPath": "test_item_id"
        },
        ...
    ```
