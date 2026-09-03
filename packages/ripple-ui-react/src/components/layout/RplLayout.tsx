import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode
} from 'react'
import clsx from 'clsx'
// import { RplBackToTop } from './RplBackToTop'
import './RplLayout.css'
import { RplIconSprite } from './../icon'

export interface RplLayoutProps {
  background?: 'default' | 'alt'
  showBackToTop?: boolean
  direction?: string
  language?: string
  sideBarPlacement?: 'left' | 'right'
  children?: ReactNode
}

type LayoutRenderProps = {
  hasSidebar: boolean
  hasBreadcrumbs: boolean
}

type LayoutSlotName =
  | 'aboveHeader'
  | 'primaryNav'
  | 'breadcrumbs'
  | 'aboveBody'
  | 'body'
  | 'sidebar'
  | 'belowBody'
  | 'footer'

type LayoutSlotChildren =
  | ReactNode
  | ((renderProps: LayoutRenderProps) => ReactNode)

type LayoutSlotProps = {
  children?: LayoutSlotChildren
}

type FragmentElement = ReactElement<{ children?: ReactNode }>

type LayoutSlotComponent = ((props: LayoutSlotProps) => null) & {
  layoutSlot: LayoutSlotName
}

type LayoutComponent = ((props: RplLayoutProps) => ReactElement) & {
  AboveHeader: LayoutSlotComponent
  Header: LayoutSlotComponent
  PrimaryNav: LayoutSlotComponent
  Breadcrumbs: LayoutSlotComponent
  AboveBody: LayoutSlotComponent
  Body: LayoutSlotComponent
  Sidebar: LayoutSlotComponent
  BelowBody: LayoutSlotComponent
  Footer: LayoutSlotComponent
}

const skipLinksId = 'rpl-skip-links'
const aboveBodyId = 'rpl-above-body'
const mainId = 'rpl-main'

const createLayoutSlot = (
  layoutSlot: LayoutSlotName,
  displayName: string
): LayoutSlotComponent => {
  const Slot = () => null

  Slot.layoutSlot = layoutSlot
  Slot.displayName = displayName

  return Slot as LayoutSlotComponent
}

const AboveHeader = createLayoutSlot('aboveHeader', 'RplLayout.AboveHeader')
const Header = createLayoutSlot('primaryNav', 'RplLayout.Header')
const PrimaryNav = Header
const Breadcrumbs = createLayoutSlot('breadcrumbs', 'RplLayout.Breadcrumbs')
const AboveBody = createLayoutSlot('aboveBody', 'RplLayout.AboveBody')
const Body = createLayoutSlot('body', 'RplLayout.Body')
const Sidebar = createLayoutSlot('sidebar', 'RplLayout.Sidebar')
const BelowBody = createLayoutSlot('belowBody', 'RplLayout.BelowBody')
const Footer = createLayoutSlot('footer', 'RplLayout.Footer')

type SlotCollection = Record<LayoutSlotName, ReactElement<LayoutSlotProps>[]>

const createEmptySlotCollection = (): SlotCollection => ({
  aboveHeader: [],
  primaryNav: [],
  breadcrumbs: [],
  aboveBody: [],
  body: [],
  sidebar: [],
  belowBody: [],
  footer: []
})

const collectSlotChildren = (
  nodes: ReactNode,
  collection = createEmptySlotCollection()
): SlotCollection => {
  Children.forEach(nodes, (child) => {
    if (!isValidElement(child)) {
      return
    }

    if (child.type === Fragment) {
      collectSlotChildren((child as FragmentElement).props.children, collection)
      return
    }

    const slotName = (child.type as Partial<LayoutSlotComponent>).layoutSlot

    if (slotName) {
      collection[slotName].push(child as ReactElement<LayoutSlotProps>)
    }
  })

  return collection
}

const hasRenderableContent = (nodes: ReactNode): boolean => {
  let foundContent = false

  Children.forEach(nodes, (child) => {
    if (foundContent) {
      return
    }

    if (child === null || child === undefined || typeof child === 'boolean') {
      return
    }

    if (typeof child === 'string' || typeof child === 'number') {
      if (String(child).trim().length > 0) {
        foundContent = true
      }
      return
    }

    if (isValidElement(child) && child.type === Fragment) {
      if (hasRenderableContent((child as FragmentElement).props.children)) {
        foundContent = true
      }
      return
    }

    foundContent = true
  })

  return foundContent
}

const hasSlotContent = (children: LayoutSlotChildren | undefined): boolean => {
  if (typeof children === 'function') {
    return true
  }

  return hasRenderableContent(children)
}

const resolveSlotChildren = (
  children: LayoutSlotChildren | undefined,
  renderProps: LayoutRenderProps
) => {
  if (typeof children === 'function') {
    return children(renderProps)
  }

  return children
}

function RplLayoutRoot({
  background = 'default',
  showBackToTop = true,
  direction,
  language,
  sideBarPlacement = 'right',
  children
}: RplLayoutProps) {
  const slots = collectSlotChildren(children)

  const hasBreadcrumbs =
    slots.breadcrumbs.some((slot) => hasSlotContent(slot.props.children)) ||
    slots.breadcrumbs.length > 0

  const hasSidebar =
    slots.sidebar.some((slot) => hasSlotContent(slot.props.children)) ||
    slots.sidebar.length > 0

  const hasAboveHeader = slots.aboveHeader.length > 0
  const hasPrimaryNav = slots.primaryNav.length > 0
  const hasAboveBody = slots.aboveBody.length > 0
  const hasBelowBody = slots.belowBody.length > 0
  const hasFooter = slots.footer.length > 0

  const renderProps = { hasSidebar, hasBreadcrumbs }

  const renderSlotGroup = (slotName: LayoutSlotName) =>
    slots[slotName].map((slot, index) => (
      <Fragment key={`${slotName}-${index}`}>
        {resolveSlotChildren(slot.props.children, renderProps)}
      </Fragment>
    ))

  const mainClassName = clsx('rpl-layout__main', {
    'rpl-col-12': true,
    'rpl-col-7-m': hasSidebar,
    'rpl-col-start-6-m': sideBarPlacement === 'left',
    [language || '']: Boolean(language)
  })

  const aboveBodyTarget = hasAboveBody ? aboveBodyId : mainId

  return (
    <div>
      <RplIconSprite></RplIconSprite>
      <div id={skipLinksId}>
        <a
          href={`#${aboveBodyTarget}`}
          className='rpl-skip-link rpl-type-p rpl-u-focusable-block rpl-u-focusable--force-on'
        >
          Skip to main content
        </a>
      </div>

      <div className={`rpl-layout rpl-layout--${background}`}>
        {hasAboveHeader ? renderSlotGroup('aboveHeader') : null}

        <div className='rpl-layout__container'>
          {hasPrimaryNav ? (
            <header id='rpl-header' className='rpl-layout__header'>
              {renderSlotGroup('primaryNav')}
              {hasBreadcrumbs ? (
                <div id='rpl-below-header' className='rpl-u-margin-t-1'>
                  {renderSlotGroup('breadcrumbs')}
                </div>
              ) : null}
            </header>
          ) : null}

          {hasAboveBody ? (
            <section id={aboveBodyId}>{renderSlotGroup('aboveBody')}</section>
          ) : null}

          <div className='rpl-layout__body-wrap'>
            <div className='rpl-container'>
              <div className='rpl-grid rpl-grid--no-row-gap rpl-layout__body'>
                {hasSidebar && sideBarPlacement === 'left' ? (
                  <aside
                    id='rpl-sidebar-left'
                    className='rpl-layout__sidebar rpl-layout__sidebar--left rpl-col-4-m rpl-col-12'
                  >
                    {renderSlotGroup('sidebar')}
                  </aside>
                ) : null}

                <main id={mainId} className={mainClassName} dir={direction}>
                  {renderSlotGroup('body')}
                </main>

                {hasSidebar && sideBarPlacement === 'right' ? (
                  <aside
                    id='rpl-sidebar'
                    className='rpl-layout__sidebar rpl-layout__sidebar--right rpl-col-4-m rpl-col-start-9-m rpl-col-12'
                  >
                    {renderSlotGroup('sidebar')}
                  </aside>
                ) : null}
              </div>
            </div>
          </div>

          {hasBelowBody ? (
            <section>{renderSlotGroup('belowBody')}</section>
          ) : null}

          {/* {showBackToTop ? <RplBackToTop topElementId={skipLinksId} /> : null} */}

          {hasFooter ? renderSlotGroup('footer') : null}
        </div>
      </div>
    </div>
  )
}

export const RplLayout = Object.assign(RplLayoutRoot, {
  AboveHeader,
  Header,
  PrimaryNav,
  Breadcrumbs,
  AboveBody,
  Body,
  Sidebar,
  BelowBody,
  Footer
}) as LayoutComponent

export type { LayoutRenderProps }
