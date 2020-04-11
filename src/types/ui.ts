export type UiOptionType =
  | string
  | number
  | {
      label: string
      [key: string]: string | number
    }
