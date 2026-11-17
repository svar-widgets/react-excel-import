import { createContext, useContext, useReducer } from 'react';
import { transformData, autoDetectMappings } from '@svar-ui/excel-import-store';

const WizardContext = createContext(null);

function createEmptyMappings(fields) {
  const mappings = {};
  for (const field of fields) {
    mappings[field.id] = null;
  }
  return mappings;
}

function createInitialState(config) {
  const state = {
    stage: 'upload',
    file: null,
    parsedData: null,
    activeSheet: '',
    sheetMappings: {},
    processingProgress: 0,
    error: null,
    autoDetections: [],
    importResult: null,
  };

  if (config.data) {
    state.stage = 'mapping';
    state.parsedData = config.data;
    state.activeSheet = config.data.sheets[0]?.name ?? '';

    for (const sheet of config.data.sheets) {
      state.sheetMappings[sheet.name] = createEmptyMappings(config.fields);
    }

    if (config.autoDetection !== false) {
      const sheet = config.data.sheets[0];
      if (sheet) {
        state.autoDetections = autoDetectMappings(sheet.columns, config.fields);
        for (const detection of state.autoDetections) {
          state.sheetMappings[sheet.name][detection.fieldId] =
            detection.columnId;
        }
      }
    }
  }

  return state;
}

function wizardReducer(state, action) {
  switch (action.type) {
    case 'SET_STAGE':
      return { ...state, stage: action.stage };

    case 'SET_FILE':
      return { ...state, file: action.file };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    case 'SET_PROCESSING_PROGRESS':
      return { ...state, processingProgress: action.progress };

    case 'SET_IMPORT_RESULT':
      return { ...state, importResult: action.result };

    case 'LOAD_DATA': {
      const { data, fields, autoDetection } = action;
      const newSheetMappings = {};
      for (const sheet of data.sheets) {
        newSheetMappings[sheet.name] = createEmptyMappings(fields);
      }

      let autoDetections = [];
      const activeSheet = data.sheets[0]?.name ?? '';

      if (autoDetection !== false && data.sheets[0]) {
        autoDetections = autoDetectMappings(data.sheets[0].columns, fields);
        for (const detection of autoDetections) {
          newSheetMappings[activeSheet][detection.fieldId] = detection.columnId;
        }
      }

      return {
        ...state,
        parsedData: data,
        activeSheet,
        sheetMappings: newSheetMappings,
        autoDetections,
      };
    }

    case 'SELECT_SHEET': {
      const { sheetName, fields, autoDetection, parsedData } = action;
      if (state.activeSheet === sheetName) return state;

      const newSheetMappings = { ...state.sheetMappings };
      if (!newSheetMappings[sheetName]) {
        newSheetMappings[sheetName] = createEmptyMappings(fields);
      }

      const sheet = parsedData?.sheets.find((s) => s.name === sheetName);
      const hasAnyMapping = Object.values(newSheetMappings[sheetName]).some(
        (v) => v !== null,
      );

      let autoDetections = [];
      if (autoDetection !== false && sheet && !hasAnyMapping) {
        autoDetections = autoDetectMappings(sheet.columns, fields);
        for (const detection of autoDetections) {
          newSheetMappings[sheetName][detection.fieldId] = detection.columnId;
        }
      }

      return {
        ...state,
        activeSheet: sheetName,
        sheetMappings: newSheetMappings,
        autoDetections,
      };
    }

    case 'SET_FIELD_MAPPING': {
      const { fieldId, columnId, fields } = action;
      const activeSheet = state.activeSheet;
      const newSheetMappings = { ...state.sheetMappings };
      newSheetMappings[activeSheet] = {
        ...(newSheetMappings[activeSheet] ?? createEmptyMappings(fields)),
      };

      if (columnId) {
        for (const [fId, cId] of Object.entries(
          newSheetMappings[activeSheet],
        )) {
          if (cId === columnId && fId !== fieldId) {
            newSheetMappings[activeSheet][fId] = null;
          }
        }
      }

      newSheetMappings[activeSheet][fieldId] = columnId;

      return { ...state, sheetMappings: newSheetMappings };
    }

    case 'CLEAR_ALL_MAPPINGS': {
      const { fields } = action;
      const newSheetMappings = { ...state.sheetMappings };
      newSheetMappings[state.activeSheet] = createEmptyMappings(fields);
      return {
        ...state,
        sheetMappings: newSheetMappings,
        autoDetections: [],
      };
    }

    case 'PERFORM_IMPORT': {
      return {
        ...state,
        importResult: action.importResult,
        stage: action.nextStage ?? state.stage,
      };
    }

    case 'RESET':
      return {
        ...state,
        stage: 'upload',
        file: null,
        parsedData: null,
        activeSheet: '',
        sheetMappings: {},
        processingProgress: 0,
        error: null,
        autoDetections: [],
        importResult: null,
      };

    default:
      return state;
  }
}

function getCurrentSheet(state) {
  if (!state.parsedData) return null;
  return (
    state.parsedData.sheets.find((s) => s.name === state.activeSheet) ?? null
  );
}

function getCurrentMappings(state, fields) {
  return state.sheetMappings[state.activeSheet] ?? createEmptyMappings(fields);
}

function getValidationResult(currentSheet, currentMappings, config) {
  if (!currentSheet) {
    return { valid: false, errors: [], warnings: [] };
  }
  if (!config.validate) {
    return { valid: true, errors: [], warnings: [] };
  }
  return config.validate(currentMappings, currentSheet);
}

function getMappedColumns(currentMappings) {
  const cols = new Set();
  for (const columnId of Object.values(currentMappings)) {
    if (columnId) cols.add(columnId);
  }
  return cols;
}

function WizardProvider({ children, config }) {
  const [state, dispatch] = useReducer(
    wizardReducer,
    config,
    createInitialState,
  );

  const currentSheet = getCurrentSheet(state);
  const currentMappings = getCurrentMappings(state, config.fields);
  const validationResult = getValidationResult(
    currentSheet,
    currentMappings,
    config,
  );
  const mappedColumns = getMappedColumns(currentMappings);

  const ctx = {
    ...state,
    config,
    currentSheet,
    currentMappings,
    validationResult,
    mappedColumns,

    setStage(stage) {
      dispatch({ type: 'SET_STAGE', stage });
    },
    setFile(file) {
      dispatch({ type: 'SET_FILE', file });
    },
    setError(error) {
      dispatch({ type: 'SET_ERROR', error });
    },
    setProcessingProgress(progress) {
      dispatch({ type: 'SET_PROCESSING_PROGRESS', progress });
    },
    loadData(data) {
      dispatch({
        type: 'LOAD_DATA',
        data,
        fields: config.fields,
        autoDetection: config.autoDetection,
      });
    },
    selectSheet(sheetName) {
      dispatch({
        type: 'SELECT_SHEET',
        sheetName,
        fields: config.fields,
        autoDetection: config.autoDetection,
        parsedData: state.parsedData,
      });
    },
    setFieldMapping(fieldId, columnId) {
      dispatch({
        type: 'SET_FIELD_MAPPING',
        fieldId,
        columnId,
        fields: config.fields,
      });
    },
    clearAllMappings() {
      dispatch({
        type: 'CLEAR_ALL_MAPPINGS',
        fields: config.fields,
      });
    },
    performImport() {
      if (!currentSheet || !validationResult.valid) return;

      const result = transformData(
        currentSheet,
        currentMappings,
        config.fields,
        config.generateIds,
      );

      config.onImport?.(result.data, result.importResult);

      if (config.autoClose) {
        config.onClose?.();
      } else {
        dispatch({
          type: 'PERFORM_IMPORT',
          importResult: result.importResult,
          nextStage: 'complete',
        });
      }
    },
    reset() {
      dispatch({ type: 'RESET' });
    },
    close() {
      config.onClose?.();
    },
  };

  return (
    <WizardContext.Provider value={ctx}>{children}</WizardContext.Provider>
  );
}

function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error(
      'Wizard context not found. Make sure this component is inside ExcelImport.',
    );
  }
  return context;
}

export { WizardContext, WizardProvider, useWizardContext };
