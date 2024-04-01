import { Input, Tooltip } from 'antd';
import React from 'react';

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const InputNumber = (props) => {
  const { value, onChange, navigator, placeholder, maxlength } = props;

  const handleChange = (e) => {
    const { value } = e.target;
    const reg = navigator ? /^-?\d*(\.\d*)?$/ : /^\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = (e) => {
    const { value } = e.target;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input a number'
  );

  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder != null ? placeholder : 'Input a number'}
        maxLength={maxlength ? maxlength : 16}
      />
    </Tooltip>
  );
};

export default InputNumber;
