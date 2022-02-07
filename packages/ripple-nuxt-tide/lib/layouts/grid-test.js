const GridTest = () => {
  const pageMargin = {
    xs: 16,
    s: 16,
    m: 24,
    l: 32,
    xl: 32
  }
  const columnGutter = {
    xs: 16,
    s: 16,
    m: 24,
    l: 32,
    xl: 32
  }

  let style = `
      <style>
          /* Page gutter */
          body .rpl-site-layout .rpl-site-constrain--on-all,
          body .rpl-site-layout .rpl-site-header {
            padding-left: ${pageMargin.xs}px !important;
            padding-right: ${pageMargin.xs}px !important;
          }
  
          @media screen and (min-width: 576px) {
            body .rpl-site-layout .rpl-site-constrain--on-all,
            body .rpl-site-layout .rpl-site-header {
              padding-left: ${pageMargin.s}px !important;
              padding-right: ${pageMargin.s}px !important;
            }
          }
  
          @media screen and (min-width: 768px) {
            body .rpl-site-layout .rpl-site-constrain--on-all,
            body .rpl-site-layout .rpl-site-header {
              padding-left: ${pageMargin.m}px !important;
              padding-right: ${pageMargin.m}px !important;
            }
          }
  
          @media screen and (min-width: 992px) {
            body .rpl-site-layout .rpl-site-constrain--on-all,
            body .rpl-site-layout .rpl-site-header {
              padding-left: ${pageMargin.l}px !important;
              padding-right: ${pageMargin.l}px !important;
            }
          }
  
          @media screen and (min-width: 1200px) {
            body .rpl-site-layout .rpl-site-header {
              padding-left: ${pageMargin.xl}px !important;
              padding-right: ${pageMargin.xl}px !important;
            }
  
            body .rpl-site-layout .rpl-site-constrain--on-all {
              padding-left: calc(50% - 33rem)!important;
              padding-right: calc(50% - 33rem)!important;
            }
          }
  
  
  
  
          /* Row */
          .rpl-row {
            margin-left: -${columnGutter.xs / 2}px !important;
            margin-right: -${columnGutter.xs / 2}px !important;
            width: calc(100% + ${columnGutter.xs}px) !important;
          }
  
          .rpl-row--gutter > div {
            margin-bottom: ${columnGutter.xs}px !important;
          }
  
          @media screen and (min-width: 576px) {
            .rpl-row {
              margin-left: -${columnGutter.s / 2}px !important;
              margin-right: -${columnGutter.s / 2}px !important;
              width: calc(100% + ${columnGutter.s}px) !important;
            }
  
            .rpl-row--gutter > div {
              margin-bottom: ${columnGutter.s}px !important;
            }
          }
  
          @media screen and (min-width: 768px) {
            .rpl-row {
              margin-left: -${columnGutter.m / 2}px !important;
              margin-right: -${columnGutter.m / 2}px !important;
              width: calc(100% + ${columnGutter.m}px) !important;
            }
  
            .rpl-row--gutter > div {
              margin-bottom: ${columnGutter.m}px !important;
            }
          }
  
          @media screen and (min-width: 992px) {
            .rpl-row {
              margin-left: -${columnGutter.l / 2}px !important;
              margin-right: -${columnGutter.l / 2}px !important;
              width: calc(100% + ${columnGutter.l}px) !important;
            }
  
            .rpl-row--gutter > div {
              margin-bottom: ${columnGutter.l}px !important;
            }
          }
  
          @media screen and (min-width: 1200px) {
            .rpl-row {
              margin-left: -${columnGutter.xl / 2}px !important;
              margin-right: -${columnGutter.xl / 2}px !important;
              width: calc(100% + ${columnGutter.xl}px) !important;
            }
  
            .rpl-row--gutter > div {
              margin-bottom: ${columnGutter.xl}px !important;
            }
          }
  
  
  
  
          /* Columns - XS / Default */
          .rpl-col {
            width: calc(8.33333% - ${columnGutter.xs}px) !important;
            margin-left: ${columnGutter.xs / 2}px !important;
            margin-right: ${columnGutter.xs / 2}px !important;
          }
  
          .rpl-col--full {
            width: calc(100% - ${columnGutter.xs}px) !important;
            margin-left: ${columnGutter.xs / 2}px !important;
            margin-right: ${columnGutter.xs / 2}px !important;
          }
  
  
  
  
  
          /* Columns - M */
          @media screen and (min-width: 768px) {
            .rpl-col {
              width: calc(8.33333% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--full {
              width: calc(100% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--1-m {
              width: calc(8.33333% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--2-m {
              width: calc(16.66667% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--3-m {
              width: calc(25% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--4-m {
              width: calc(33.33333% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--5-m {
              width: calc(41.66667% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--6-m {
              width: calc(50% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--7-m {
              width: calc(58.33333% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--8-m {
              width: calc(66.66667% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--9-m {
              width: calc(75% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--10-m {
              width: calc(83.33333% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--11-m {
              width: calc(91.66667% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
  
            .rpl-col--12-m {
              width: calc(100% - ${columnGutter.m}px) !important;
              margin-left: ${columnGutter.m / 2}px !important;
              margin-right: ${columnGutter.m / 2}px !important;
            }
          }
  
  
  
          /* Columns - L */
          @media screen and (min-width: 960px) {
            .rpl-col {
              width: calc(8.33333% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--full {
              width: calc(100% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--1-l {
              width: calc(8.33333% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--2-l {
              width: calc(16.66667% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--3-l {
              width: calc(25% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--4-l {
              width: calc(33.33333% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--5-l {
              width: calc(41.66667% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--6-l {
              width: calc(50% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--7-l {
              width: calc(58.33333% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--8-l {
              width: calc(66.66667% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--9-l {
              width: calc(75% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--10-l {
              width: calc(83.33333% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--11-l {
              width: calc(91.66667% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
  
            .rpl-col--12-l {
              width: calc(100% - ${columnGutter.l}px) !important;
              margin-left: ${columnGutter.l / 2}px !important;
              margin-right: ${columnGutter.l / 2}px !important;
            }
          }
      </style>
      `

  document.head.insertAdjacentHTML("beforeend", style)

  console.log('Grid test injected')
}

export default GridTest
