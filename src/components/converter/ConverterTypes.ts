import { DropDownOptionType } from '../input/dropdown/SingleSelectDropDown'

export enum UnitType {
  LENGTH,
  WEIGHT,
  VOLUME,
}

export interface UnitOptionValueType {
  label: string
  type: UnitType
}

export interface UnitOptionType extends DropDownOptionType {
  value: UnitOptionValueType
}

export const lengthOptions: UnitOptionType[] = [
  {
    label: 'CM',
    value: {
      label: 'CM',
      type: UnitType.LENGTH,
    },
  },
  {
    label: 'IN',
    value: {
      label: 'IN',
      type: UnitType.LENGTH,
    },
  },
  {
    label: 'FT',
    value: {
      label: 'FT',
      type: UnitType.LENGTH,
    },
  },
  {
    label: 'YD',
    value: {
      label: 'YD',
      type: UnitType.LENGTH,
    },
  },
]

export const weightOptions: UnitOptionType[] = [
  {
    label: 'KG',
    value: {
      label: 'KG',
      type: UnitType.WEIGHT,
    },
  },
  {
    label: 'LB',
    value: {
      label: 'LB',
      type: UnitType.WEIGHT,
    },
  },
]

export const volumeOptions: UnitOptionType[] = [
  {
    label: 'L',
    value: {
      label: 'L',
      type: UnitType.VOLUME,
    },
  },
  {
    label: 'G',
    value: {
      label: 'G',
      type: UnitType.VOLUME,
    },
  },
]
