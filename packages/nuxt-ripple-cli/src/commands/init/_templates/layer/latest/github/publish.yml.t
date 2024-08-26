---
to: "<%= gitHubActions ? `.github/workflows/publish.yml` : null %>"
---
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish-gpr:
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Install Node
        uses: actions/setup-node@v4
        with:
          registry-url: 'https://npm.pkg.github.com/'
          node-version: 20
      - name: Set Git credentials
        run: |
          git config --global user.email "sdp.devs@dpc.vic.gov.au"
          git config --global user.name "SDP Deploy"
      - name: Bump version from release number
        run: npm version ${{ github.event.release.name }} --no-git-tag-version
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Publish to GH Package registry
        run: npm publish --tag ${{ github.event.release.prerelease && 'alpha' || 'latest' }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
