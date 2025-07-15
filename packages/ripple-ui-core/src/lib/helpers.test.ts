import { describe, expect, it } from 'vitest'
import { distanceAsPercentage, formatDate } from './helpers.js'

describe('Formatting a date', () => {
  const raw = '2024-08-02T09:00:00+1000'

  it('formats a date', () => {
    expect(formatDate(raw)).toEqual('2 Aug 2024')
    expect(formatDate('06/22/2025')).toEqual('22 June 2025')
    expect(formatDate('2024-12-24')).toEqual('24 Dec 2024')
    expect(formatDate('April 17, 2025')).toEqual('17 Apr 2025')
    expect(formatDate('December 17, 2024 03:24:00')).toEqual('17 Dec 2024')
    expect(formatDate(628021800000)).toEqual('26 Nov 1989')
  })

  it('accepts summary level Intl.DateTimeFormatOptions', () => {
    expect(formatDate(raw, { dateStyle: 'full' })).toEqual(
      'Friday 2 August 2024 at 9:00 am'
    )
  })

  it('properly truncates any month except June or July', () => {
    expect(formatDate('2024-01-02T09:00:00+1000')).toEqual('2 Jan 2024')
    expect(formatDate('2024-02-02T09:00:00+1000')).toEqual('2 Feb 2024')
    expect(formatDate('2024-03-02T09:00:00+1000')).toEqual('2 Mar 2024')
    expect(formatDate('2024-04-02T09:00:00+1000')).toEqual('2 Apr 2024')
    expect(formatDate('2024-05-02T09:00:00+1000')).toEqual('2 May 2024')
    expect(formatDate('2024-06-02T09:00:00+1000')).toEqual('2 June 2024')
    expect(formatDate('2024-07-02T09:00:00+1000')).toEqual('2 July 2024')
    expect(formatDate('2024-08-02T09:00:00+1000')).toEqual('2 Aug 2024')
    expect(formatDate('2024-09-02T09:00:00+1000')).toEqual('2 Sep 2024')
    expect(formatDate('2024-10-02T09:00:00+1000')).toEqual('2 Oct 2024')
    expect(formatDate('2024-11-02T09:00:00+1000')).toEqual('2 Nov 2024')
    expect(formatDate('2024-12-02T09:00:00+1000')).toEqual('2 Dec 2024')
  })

  it('accepts separate Intl.DateTimeFormatOptions', () => {
    expect(
      formatDate(raw, { day: 'numeric', month: 'short', year: '2-digit' })
    ).toEqual('2 Aug 24')
  })

  it('accepts custom date options with a non-default tz', () => {
    expect(
      formatDate(raw, {
        dateStyle: 'medium',
        timeZone: 'Japan',
        timeStyle: 'short'
      })
    ).toEqual('2 Aug 2024, 8:00 am')
  })

  it('outputs the full date as per the news component', () => {
    const props = {
      details: {
        published: '2022-11-11T11:11:00+10:00'
      }
    }
    const flags = {
      hidePublishedTime: false
    }
    expect(
      formatDate(props.details?.published, {
        dateStyle: 'full',
        timeStyle: flags?.hidePublishedTime ? undefined : 'short'
      })
    ).toEqual('Friday 11 November 2022 at 12:11 pm')
  })

  it('returns the supplied value if the date is invalid', () => {
    expect(formatDate('')).toEqual('')
    expect(formatDate('23/5/2026')).toEqual('23/5/2026')
    expect(formatDate('20/13/2O26')).toEqual('20/13/2O26')
    expect(formatDate('June 10th, 2026')).toEqual('June 10th, 2026')
  })
})

describe('Transform distance to percentage', () => {
  it('transforms a simple 100-scale', () => {
    expect(distanceAsPercentage(35, 100)).toEqual(35)
  })

  it('transforms a point above ceil', () => {
    expect(distanceAsPercentage(110, 100)).toEqual(100)
  })

  it('transforms a point below floor', () => {
    expect(distanceAsPercentage(-80, 100)).toEqual(0)
  })

  it('transforms a complex scale', () => {
    expect(distanceAsPercentage(29, 76)).toEqual(38.16)
  })
})
