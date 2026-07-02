import { RichSelect } from '@svar-ui/react-core';
import './Dropdown.css';

const scope = 'wx-aaaDS1Kk';

function Dropdown(props) {
  const {
    options,
    value,
    placeholder = 'Select...',
    disabled = false,
    onChange,
  } = props;

  return (
    <RichSelect
      dropdown={{ trackScroll: true }}
      options={options}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    >
      {(option) => (
        <div
          className={[
            option?.used ? 'wx-used' : '',
            option?.default ? 'wx-default' : '',
            scope,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {option?.label}
          {option?.used && <i className="wxi-check"></i>}
        </div>
      )}
    </RichSelect>
  );
}

export default Dropdown;
