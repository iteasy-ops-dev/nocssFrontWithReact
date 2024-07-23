import React, { useState } from 'react';
import OptionSelect from './optionFields/OptionSelect';
import SetupFields from './optionFields/SetupFields';
import DeleteFields from './optionFields/DeleteFields';

const WebHostManager = ({ formData, handleChange }) => {
  const [setupType, setSetupType] = useState(formData.options.setup || "true");

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    if (name === 'options.setup') {
      setSetupType(value); // 'setup' 옵션이 변경되면 상태를 업데이트
    }
  };

  return (
    <div>
      <h3>추가 옵션</h3>
      <OptionSelect
        setupType={setupType}
        onChange={handleLocalChange}
      />
      {setupType === "true" && (
        <SetupFields
          formData={formData}
          onChange={handleLocalChange}
        />
      )}
      {setupType === "false" && (
        <DeleteFields
          formData={formData}
          onChange={handleLocalChange}
        />
      )}
    </div>
  );
}

export default WebHostManager;
