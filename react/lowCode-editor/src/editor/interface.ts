import type { PropsWithChildren, CSSProperties } from "react";

export interface CommonComponentProps extends PropsWithChildren {
  id: number
  name: string
  styles?: CSSProperties
  [key: string]: any
}