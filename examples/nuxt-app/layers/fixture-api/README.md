## About this layer

This layer holds a couple of complete page layouts that can be used to test specific use cases.

No backend is needed, the API is stubbed with flat file json fixtures (also used for cypress).

1. [_fixture/page](http://localhost:3000/_fixture/page) Fixtures both page and site content, leaves sidebar slot open for debug

2. [_fixture/tide-site](http://localhost:3000/_fixture/tide-site) Fixtures page content, but uses back end for site content

3. [_fixture/page-exposed](http://localhost:3000/_fixture/page-exposed) Fixtures both page and site content, expose all layout slots

4. [_fixture/document](http://localhost:3000/_fixture/document) Edge case example for cheerio rendering
