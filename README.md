<div align="center">

# SVAR React Excel Import

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/@svar-ui/react-excel-import.svg)](https://www.npmjs.com/package/@svar-ui/react-excel-import)
[![License](https://img.shields.io/github/license/svar-widgets/react-excel-import)](https://github.com/svar-widgets/react-excel-import/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/@svar-ui/react-excel-import.svg)](https://www.npmjs.com/package/@svar-ui/react-excel-import)

</div>

[SVAR React Excel Import](https://svar.dev/) is a customizable, high-performance React component for importing data from `.xlsx`, `.csv`, and `.tsv` files. It parses a file, lets users map source columns to your application fields, transforms rows into keyed objects, and returns the imported data to your app.

The component helps you quickly add a guided import modal to React applications with minimal setup. Includes TypeScript support and is compatible with React 18+ and Next.js.

### ✨ Key Features

- Modal import wizard for `.xlsx`, `.csv`, and `.tsv` files
- Automatic column-to-field mapping with header and keyword detection
- Multi-sheet workbook support
- Light and dark themes
- Full TypeScript support

### :hammer_and_wrench: How to Use

Import the package, render it while the import modal should be open, and pass the target `fields` the source columns can map to:

```jsx
import { useState } from 'react';
import { ExcelImport } from '@svar-ui/react-excel-import';
import '@svar-ui/react-excel-import/all.css';

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

By default, the widget accepts `.xlsx`, `.csv`, and `.tsv` files and renders mapping selectors in both the table headers and the right-side fields panel. Use the `accept` and `selectors` props to change this.

### :speech_balloon: Need Help?

[Post an issue](https://github.com/svar-widgets/react-excel-import/issues) or use our [community forum](https://forum.svar.dev).

### ⭐ Show Your Support

If SVAR React Excel Import helps your project, [give it a star](https://github.com/svar-widgets/react-excel-import). It helps other developers discover this library and motivates us to keep improving.
