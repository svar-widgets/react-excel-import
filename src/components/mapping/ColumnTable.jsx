import { useContext, useMemo } from 'react';
import { useWizardContext } from '../../context.jsx';
import { context } from '@svar-ui/react-core';
import { getPreviewRows } from '@svar-ui/excel-import-store';
import ColumnTableHeader from './ColumnTableHeader.jsx';
import ColumnTableRow from './ColumnTableRow.jsx';

import './ColumnTable.css';

function ColumnTable() {
  const ctx = useWizardContext();
  const locale = useContext(context.i18n);
  const _ = locale.getGroup('excel-import');

  const sheet = useMemo(() => ctx.currentSheet, [ctx.currentSheet]);
  const columns = useMemo(() => sheet?.columns ?? [], [sheet]);
  const previewRowCount = useMemo(
    () => ctx.config.previewRowCount ?? 10,
    [ctx.config.previewRowCount],
  );
  const previewRows = useMemo(
    () => (sheet ? getPreviewRows(sheet, previewRowCount) : []),
    [sheet, previewRowCount],
  );

  return (
    <div className="wx-table-wrap wx-aabGbUld">
      {sheet && columns.length > 0 && previewRows.length > 0 ? (
        <div className="wx-table-scroll wx-aabGbUld">
          <table className="wx-table wx-aabGbUld">
            <thead className="wx-aabGbUld">
              <tr className="wx-aabGbUld">
                {columns.map((column, i) => (
                  <ColumnTableHeader key={column.id ?? i} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className="wx-aabGbUld">
              {previewRows.map((row, index) => (
                <ColumnTableRow
                  key={index}
                  row={row}
                  columns={columns}
                  rowIndex={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wx-empty wx-aabGbUld">{_('No data available')}</div>
      )}
    </div>
  );
}

export default ColumnTable;
