// This file is used to declare component specific constants. Delete if not needed

export type RplListTypes = 'ul' | 'ol'

export interface RplListItemArray {
  text: string,
  icon: string,
  url: string,
  active: boolean,
  items: RplListItemArray[],
}
