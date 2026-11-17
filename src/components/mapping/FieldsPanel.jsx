import { useWizardContext } from '../../context.jsx';
import FieldItem from './FieldItem.jsx';

import './FieldsPanel.css';

function FieldsPanel() {
  const ctx = useWizardContext();

  return (
    <aside className="wx-fields-panel wx-aadKlU7K">
      <div className="wx-panel-content wx-aadKlU7K">
        {ctx.config.fields.map((field) => (
          <FieldItem key={field.id} field={field} />
        ))}
      </div>
    </aside>
  );
}

export default FieldsPanel;
