import { expect, describe, it, beforeAll } from 'vitest'
import * as jsonapiParse from 'jsonapi-parse'
import { rawData } from './rawdata'
import { map as siteAlertsMapping, TideAlert } from '../site-alerts-mapping'

const result: TideAlert[] = [
  {
    alertId: 'fabc6c5c-ad02-4b2a-a129-86c6f1eefb05',
    variant: 'error',
    iconName: 'icon-exclamation-circle-filled',
    message: 'Emergency title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '2defd9c6-eb3b-4ebf-992e-7d2f174da89f',
    variant: 'error',
    iconName: 'icon-fire',
    message: 'Fire title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: 'a476dce6-cc82-4bbe-aa74-1118afe31be6',
    variant: 'error',
    iconName: 'icon-flood',
    message: 'Flood title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '6748d9aa-1f8a-4dc8-833a-9013a109eaf4',
    variant: 'error',
    iconName: 'icon-medical',
    message: 'Medical title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '5989f17e-810f-44be-9083-9802808ea960',
    variant: 'warning',
    iconName: 'icon-lightning',
    message: 'Lightning title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '1a0dce6a-57e6-4f13-8263-4054fa1cc09e',
    variant: 'warning',
    iconName: 'icon-smoke',
    message: 'Pollution title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '67d48527-5c4f-4cb8-9fa7-57c3c721445b',
    variant: 'warning',
    iconName: 'icon-temperature',
    message: 'Heat wave title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: '253f5c6b-29b4-4e24-9312-4da69bf27e32',
    variant: 'information',
    iconName: 'icon-information-circle-filled',
    message: 'Demo alert title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: 'b9308945-a73e-4ab0-bfdf-61b8b9cd600e',
    variant: 'information',
    iconName: 'icon-traffic',
    message: 'Traffic title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  },
  {
    alertId: 'dbb21011-faa8-487c-938f-27658a18b9cf',
    variant: 'information',
    iconName: 'icon-information-circle-filled',
    message: 'Notification title',
    linkText: 'Test link',
    linkUrl: 'https://www.demo.vic.gov.au/demo-landing-page'
  }
]

describe('siteAlertsMapping', () => {
  let parsedData

  beforeAll(() => {
    parsedData = jsonapiParse.parse(rawData).data[0]
  })

  it('maps a raw json api response to a list of TideAlert structures', () => {
    expect(siteAlertsMapping(parsedData)).toEqual(result)
  })

  it('returns an empty array when there are no alerts', () => {
    expect(siteAlertsMapping({ ...parsedData, site_alerts: null })).toEqual([])
  })
})
