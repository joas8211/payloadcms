import React from 'react'
import { useTranslation } from 'react-i18next'

import { CheckboxInput } from '../../../../forms/field-types/Checkbox/Input'
import { SelectAllStatus, useSelection } from '../SelectionProvider'

const SelectAll: React.FC = () => {
  const { t } = useTranslation('general')
  const { selectAll, toggleAll } = useSelection()

  return (
    <CheckboxInput
      checked={
        selectAll === SelectAllStatus.AllInPage || selectAll === SelectAllStatus.AllAvailable
      }
      aria-label={selectAll === SelectAllStatus.None ? t('selectAllRows') : t('deselectAllRows')}
      id="select-all"
      onToggle={() => toggleAll()}
      partialChecked={selectAll === SelectAllStatus.Some}
    />
  )
}

export default SelectAll