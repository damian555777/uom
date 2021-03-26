import './Converter.scss'

import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import SingleSelectDropDown from '../input/dropdown/SingleSelectDropDown'
import {
  UnitType,
  UnitOptionType,
  UnitOptionValueType,
  lengthOptions,
  weightOptions,
  volumeOptions,
} from './ConverterTypes'
import { TextField } from '@material-ui/core'

interface ConverterProps {
  id: string
}

const Converter: React.FC<ConverterProps> = ({ id }) => {
  const { t } = useTranslation()

  /**
   * Set initial state
   * Constructing labels for drop downs here since we should use internationalization
   */
  const [leftUnitOptions] = useState<UnitOptionType[]>([
    {
      label: t(`unit.${UnitType[UnitType.LENGTH]}`),
      value: {
        label: t(`unit.${UnitType[UnitType.LENGTH]}`),
        type: UnitType.LENGTH,
      },
      isDisabled: true,
    },
    ...lengthOptions,
    {
      label: t(`unit.${UnitType[UnitType.WEIGHT]}`),
      value: {
        label: t(`unit.${UnitType[UnitType.WEIGHT]}`),
        type: UnitType.WEIGHT,
      },
      isDisabled: true,
    },
    ...weightOptions,
    {
      label: t(`unit.${UnitType[UnitType.VOLUME]}`),
      value: {
        label: t(`unit.${UnitType[UnitType.VOLUME]}`),
        type: UnitType.VOLUME,
      },
      isDisabled: true,
    },
    ...volumeOptions,
  ])
  const [leftUnit, setLeftUnit] = useState<UnitOptionValueType>(
    lengthOptions[0].value
  )
  const [leftValue, setLeftValue] = useState<string>('0')

  const [rightUnitType, setRightUnitType] = useState<UnitType>(UnitType.LENGTH)
  const [rightUnitOptions, setRightUnitOptions] = useState<UnitOptionType[]>([
    {
      label: t(`unit.${UnitType[UnitType.LENGTH]}`),
      value: {
        label: t(`unit.${UnitType[UnitType.LENGTH]}`),
        type: UnitType.LENGTH,
      },
      isDisabled: true,
    },
    ...lengthOptions,
  ])
  const [rightUnit, setRightUnit] = useState<UnitOptionValueType>(
    lengthOptions[1].value
  )
  const [rightValue, setRightValue] = useState<string>('0')

  const [shouldReconvert, setShouldReconvert] = useState<boolean>(false)

  /**
   * Handler for when the left unit changes.
   * We'll need to adjust the items in the right dropdown if the types don't match, can't convert LENGTH units to VOLUME units, etc.
   * Also, need to adjust the right unit if the left unit is the exact same, no sense in converting IN to IN, etc.
   */
  useEffect(() => {
    if (leftUnit?.type !== rightUnitType) {
      setRightUnitType(leftUnit.type)
      const newRightUnitOptions: UnitOptionType[] = leftUnitOptions.filter(
        // eslint-disable-next-line
        (leftUnitOption: UnitOptionType) => {
          if (leftUnitOption?.value?.type === leftUnit.type) {
            return leftUnitOption
          }
        }
      )
      setRightUnitOptions(newRightUnitOptions)
    } else if (leftUnit === rightUnit) {
      for (const rightUnitOption of rightUnitOptions) {
        if (!rightUnitOption.isDisabled && rightUnitOption.value !== leftUnit) {
          setRightUnit(rightUnitOption.value)
          break
        }
      }
      setShouldReconvert(true)
    } else {
      setShouldReconvert(true)
    }
    // eslint-disable-next-line
  }, [leftUnit])

  useEffect(() => {
    for (const rightUnitOption of rightUnitOptions) {
      if (!rightUnitOption?.isDisabled && rightUnitOption.value !== leftUnit) {
        setRightUnit(rightUnitOption.value)
        break
      }
    }
    setShouldReconvert(true)
    // eslint-disable-next-line
  }, [rightUnitOptions])

  useEffect(() => {
    if (leftUnit === rightUnit) {
      for (const rightUnitOption of rightUnitOptions) {
        if (!rightUnitOption.isDisabled && rightUnitOption.value !== leftUnit) {
          setLeftUnit(rightUnitOption.value)
          break
        }
      }
    }
    if (!shouldReconvert) {
      setShouldReconvert(true)
    }
  }, [rightUnit])

  useEffect(() => {
    if (shouldReconvert) {
      convertUnit(leftValue, true)
      setShouldReconvert(false)
    }
  }, [shouldReconvert])

  const handleValueChange = (e: any, isLeft: boolean) => {
    const value: string = e?.target?.value
    if (/^\d*\.?\d*$/.test(value)) {
      if (isLeft) {
        setLeftValue(value)
      } else {
        setRightValue(value)
      }
      convertUnit(value, isLeft)
    }
  }

  const convertUnit = (value: string, isLeft: boolean) => {
    const formattedValue: number = value.endsWith('.')
      ? +value.substring(0, value.length - 1)
      : +value
    debugger
    const leftUnitValue = getUnitValue(leftUnit.label)
    const rightUnitValue = getUnitValue(rightUnit.label)
    if (isLeft) {
      const convertedValue =
        Math.ceil(((formattedValue * leftUnitValue) / rightUnitValue) * 100) /
        100
      debugger
      setRightValue(`${convertedValue}`)
    } else {
      const convertedValue =
        Math.ceil(((formattedValue * rightUnitValue) / leftUnitValue) * 100) /
        100
      setLeftValue(`${convertedValue}`)
    }
  }

  const getUnitValue = (unit: string): number => {
    let unitValue: number = 0
    switch (unit) {
      case 'CM':
        unitValue = 1 / 2.54
        break
      case 'IN':
        unitValue = 1
        break
      case 'FT':
        unitValue = 12
        break
      case 'YD':
        unitValue = 36
        break
      case 'KG':
        unitValue = 2.2
        break
      case 'LB':
        unitValue = 1
        break
      case 'G':
        unitValue = 1
        break
      case 'L':
        unitValue = 1 / 3.8
        break
      default:
        console.error(`Cannot convert unkown unit: ${unit}`)
        break
    }
    return unitValue
  }

  return (
    <div id={id} className='dc-converter'>
      <div id={id} className='dc-converter-left'>
        <SingleSelectDropDown
          id={`${id}_left_unit`}
          value={leftUnit}
          setValue={setLeftUnit}
          valueOptions={leftUnitOptions}
        />
        <TextField
          id={`${id}_left_value`}
          value={leftValue}
          onChange={(e: any) => handleValueChange(e, true)}
        />
      </div>
      <div id={id} className='dc-converter-right'>
        <SingleSelectDropDown
          id={`${id}_right_unit`}
          value={rightUnit}
          setValue={setRightUnit}
          valueOptions={rightUnitOptions}
        />
        <TextField
          id={`${id}_right_value`}
          value={rightValue}
          onChange={(e: any) => handleValueChange(e, false)}
        />
      </div>
    </div>
  )
}

export default Converter
