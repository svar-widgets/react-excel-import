# SVAR React Excel Import PRO

This package contains the **PRO Edition of SVAR React Excel Import**, which provides extra features for production projects.

**Depending on the license you purchased**, you are granted the right to use this package under one of the following commercial licenses:

- [Developer License](https://svar.dev/licenses/license-agreements/#developer)
- [Application License](https://svar.dev/licenses/license-agreements/#application)
- [Team License](https://svar.dev/licenses/license-agreements/#team)
- [Enterprise License](https://svar.dev/licenses/license-agreements/#enterprise)

### Get Help

If you have technical questions about using SVAR React Excel Import, you can use our [SVAR forum](https://forum.svar.dev/) or contact us at support@svar.dev (please provide your license number).

### How to Use

To use the widget, import the package, render it while the import modal should be open, and pass the target `fields` the source columns can map to:

```jsx
import { useState } from 'react';
import { ExcelImport } from '@svar/react-excel-import';
import '@svar/react-excel-import/all.css';

const fields = [
  { id: 'name', label: 'Name', required: true },
  { id: 'email', label: 'Email', required: true },
  { id: 'phone', label: 'Phone' },
];

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Import Excel</button>
      {open && (
        <ExcelImport
          fields={fields}
          onImport={(rows, result) =>
            console.log('Imported rows:', rows, result)
          }
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
```

See the [docs](https://docs.svar.dev/react/excel-import/) to learn how to configure fields, mapping, validation, and integrations.
