import { useState } from 'react';
import { Button } from '@svar-ui/react-core';
import { ExcelImport } from '../../src/index.js';

export default function MandatoryFields() {
  const [isVisible, setIsVisible] = useState(false);

  const config = {
    fields: [
      { id: 'name', label: 'Name', required: true },
      { id: 'email', label: 'Email' },
      { id: 'comments', label: 'Comments' },
    ],
    onImport: (data, result) => console.log('Imported:', data, result),
    onClose: () => setIsVisible(false),
    validate: (mappings) => {
      const errors = [];
      if (mappings.name === null) {
        errors.push({ fieldId: 'name', message: 'Name is required' });
      }
      if (mappings.email === null) {
        errors.push({
          fieldId: 'email',
          message: 'Email is required',
        });
      }
      return {
        valid: errors.length === 0,
        errors,
        warnings: [],
      };
    },
    autoClose: true,
  };

  return (
    <div className="demo-box">
      <Button type="primary" onClick={() => setIsVisible((v) => !v)}>
        Click me to open
      </Button>
      {isVisible && <ExcelImport {...config} />}
    </div>
  );
}
