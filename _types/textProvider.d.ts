
export interface IFTextContext {
  children: any,
  locale?: string
}

export type Tt = (textKey: string) => string

export type TtBlock = (textKey: string) => any

export type TuseTranslation = () => any