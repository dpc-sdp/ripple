export const rplHeaderGraphicPlacements = ['top', 'bottom'] as const
export type RplHeaderGraphicPlacement =
  (typeof rplHeaderGraphicPlacements)[number]

export interface RplHeaderGraphicProps {
  image?: string | boolean
  placement?: RplHeaderGraphicPlacement
}
