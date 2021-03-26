import React from 'react'

import { MenuItem, Select } from '@material-ui/core'

export interface DropDownOptionType {
  label: string
  value: any
  isDisabled?: boolean
}

interface SingleSelectDropDownProps {
  id: string
  value: any
  setValue: Function
  valueOptions: DropDownOptionType[]
  className?: string
}

const SingleSelectDropDown: React.FC<SingleSelectDropDownProps> = ({
  id,
  value,
  setValue,
  valueOptions,
  className,
}) => {
  const getSelectWidth = () => {
    let maxChars: number = 1
    valueOptions.forEach((quantityOption: DropDownOptionType) => {
      maxChars = Math.max(maxChars, quantityOption.label.length)
    })
    return maxChars + 7
  }

  return (
    <Select
      id={`${id}_single_select_dd`}
      className={`dc-single-select-dd${className ? ` ${className}` : ''}`}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      style={{ width: `calc(${getSelectWidth()}ch)` }}
    >
      {valueOptions.map((valueOption: DropDownOptionType, index) => (
        <MenuItem
          key={`${id}_single_select__dd_option_${index}`}
          value={valueOption.value}
          className='dc-single-select-dd-option'
          disabled={valueOption.isDisabled}
        >
          {valueOption.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SingleSelectDropDown
