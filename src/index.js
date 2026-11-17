// Main component export
export { default as ExcelImport } from './components/ExcelImport.jsx';

// Re-export from store for convenience
export { formatDate } from '@svar-ui/excel-import-store';

// code below is internals exposed for UI regression testing — not part of the stable public API.
export { default as StageUpload } from './components/stages/StageUpload.jsx';
export { default as StageProcessing } from './components/stages/StageProcessing.jsx';
export { default as StageMapping } from './components/stages/StageMapping.jsx';
export { default as StageComplete } from './components/stages/StageComplete.jsx';

export { WizardContext, WizardProvider, useWizardContext } from './context.jsx';
