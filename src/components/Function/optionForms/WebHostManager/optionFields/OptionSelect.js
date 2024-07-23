import React from 'react';

const OptionSelect = ({ setupType, onChange }) => {
  return (
    <div>
      <label>
        타입:
        <select
          name="options.setup"
          value={setupType}
          onChange={onChange}>
          <option value="true">생성</option>
          <option value="false">삭제</option>
        </select>
      </label>
    </div>
  );
}

export default OptionSelect;
