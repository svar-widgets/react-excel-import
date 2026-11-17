import { useContext, useMemo } from 'react';
import { useWizardContext } from '../../context.jsx';
import { context } from '@svar-ui/react-core';
import Dropdown from '../ui/Dropdown.jsx';
import { formatCellValue } from '@svar-ui/excel-import-store';

import './FieldItem.css';

function FieldItem(props) {
  const { field } = props;

  const locale = useContext(context.i18n);
  const _ = locale.getGroup('excel-import');

  const ctx = useWizardContext();

  const currentMapping = useMemo(
    () => ctx.currentMappings[field.id] ?? null,
    [ctx.currentMappings, field.id],
  );

  const columns = useMemo(
    () => ctx.currentSheet?.columns ?? [],
    [ctx.currentSheet],
  );

  const hasError = useMemo(
    () => ctx.validationResult.errors.some((e) => e.fieldId === field.id),
    [ctx.validationResult, field.id],
  );

  // Get preview value from the mapped column
  const previewValue = useMemo(() => {
    if (!currentMapping || !ctx.currentSheet) return null;
    const col = ctx.currentSheet.columns.find((c) => c.id === currentMapping);
    if (!col || col.sampleValues.length === 0) return null;
    return formatCellValue(col.sampleValues[0], 50, field.dateFormat);
  }, [currentMapping, ctx.currentSheet, field.dateFormat]);

  // Find which field is using a column
  const getFieldUsingColumn = (colId) => {
    for (const [fieldId, mappedColId] of Object.entries(ctx.currentMappings)) {
      if (mappedColId === colId && fieldId !== field.id) {
        return fieldId;
      }
    }
    return null;
  };

  // Build dropdown options
  const dropdownOptions = useMemo(
    () => [
      { id: '__skip__', label: _('None'), default: true },
      ...columns.map((col) => {
        const usedByFieldId = getFieldUsingColumn(col.id);
        return {
          id: col.id,
          label: col.header || `Column ${col.id}`,
          used: usedByFieldId !== null,
        };
      }),
    ],
    [columns, ctx.currentMappings, field.id, _],
  );

  function handleChange({ value }) {
    const colId = typeof value === 'string' ? value : String(value);
    if (colId !== '__skip__') {
      const usedByFieldId = getFieldUsingColumn(colId);
      if (usedByFieldId) {
        ctx.setFieldMapping(usedByFieldId, null);
      }
      ctx.setFieldMapping(field.id, colId);
    } else {
      ctx.setFieldMapping(field.id, null);
    }
  }

  const rootClassName = [
    'wx-field',
    hasError ? 'wx-error' : '',
    currentMapping !== null ? 'wx-mapped' : '',
    'wx-aacwkSqA',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <div className="wx-field-label wx-aacwkSqA">
        <span
          className={`wx-field-name wx-aacwkSqA${hasError ? ' wx-field-warning' : ''}`}
        >
          {field.label}
        </span>
        {((field.required && !currentMapping) || hasError) && (
          <span
            className="wx-field-required wx-aacwkSqA"
            title={_('Required field')}
          >
            *
          </span>
        )}
      </div>

      <div className="wx-field-dropdown wx-aacwkSqA">
        <Dropdown
          options={dropdownOptions}
          value={currentMapping || '__skip__'}
          onChange={handleChange}
        />
      </div>

      {previewValue && (
        <div className="wx-field-preview wx-aacwkSqA">
          {'\u21b3'} {previewValue}
        </div>
      )}
    </div>
  );
}

export default FieldItem;
