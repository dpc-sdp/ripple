export interface IRplSocialShareEmail {
  subject: string
  body: string
}

export type RplSocialShareNetwork = string

export interface RplSocialShareProps {
  title?: string
  networks?: RplSocialShareNetwork[]
  pagetitle: string
  url: string
  email?: IRplSocialShareEmail
}
