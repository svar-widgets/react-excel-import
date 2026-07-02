import type { FC } from 'react';

export type {
  ImportWizardConfig,
  FieldDefinition,
  TransformedRow,
  ColumnType,
  ColumnInfo,
  ParsedSheetData,
  ParsedExcelData,
  FieldMappings,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ImportResult,
  AutoDetection,
  WizardStage,
} from '@svar-ui/excel-import-store';

export { indexToColumnId, columnIdToIndex } from '@svar-ui/excel-import-store';

import type { ImportWizardConfig } from '@svar-ui/excel-import-store';

export declare const ExcelImportWizard: FC<ImportWizardConfig>;

export declare function formatDate(
  value: Date | number,
  format?: string,
): string;

export declare function draggable(
  node: HTMLElement,
  params?: { onDragStart?: (e: DragEvent) => void; data?: string },
): { destroy: () => void };
