// This file is used to declare component specific constants. Delete if not needed

export const vicGovHomeUrl = 'https://vic.gov.au';
export const vicGovHomeLabel = 'Victoria government home';

export const RplFooterVariants = ['default', 'neutral'] as const

export interface CoreLink {
  label: string,
  url: string,
}

export interface LogoLink {
  label: string,
  url: string,
  imgSrc: string,
}
