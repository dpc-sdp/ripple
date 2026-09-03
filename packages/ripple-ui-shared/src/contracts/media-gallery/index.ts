export interface RplMediaGalleryItem {
  title: string
  alt: string
  image: string
  thumbnail: string
  caption?: string
}

export interface RplMediaGalleryProps {
  id: string
  items: RplMediaGalleryItem[]
  background?: boolean
}
