import React from 'react';

const PackageManager = ({ formData, handleChange }) => {
  const options = [
    { value: "false", label: "false" },
    { value: "true", label: "true" },
  ];

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // 텍스트영역의 값을 줄바꿈이나 쉼표로 분할합니다.
    let updatedValue;
    if (name === 'options.packages_to_install' || name === 'options.packages_to_remove') {
      updatedValue = value.split(/[\n,\s]+/); // 줄바꿈, 쉼표, 공백 모두로 분할합니다.

      // 만약 결과 배열이 [''] 형태라면 해당 키를 제거합니다.
      if (updatedValue.length === 1 && updatedValue[0] === '') {
        updatedValue = undefined; // 또는 null로 설정할 수 있습니다. 상황에 따라 다릅니다.
      }
    } else if (name === 'options.perform_update') {
      updatedValue = value === 'true';
    } else {
      updatedValue = value;
    }
    
    // 만약 updatedValue가 undefined나 null이면 formData.options에서 해당 키를 제거합니다.
    const updatedOptions = {
      ...formData.options,
      [name.substring(name.indexOf('.') + 1)]: updatedValue
    };

    handleChange({
      target: {
        name: 'options',
        value: updatedOptions
      }
    });
  };

  return (
    <div>
      <h3>추가 옵션</h3>
      <div>
        <label>
          설치할 패키지들:
          <textarea
            name="options.packages_to_install"
            value={formData.options.packages_to_install}
            placeholder="패키지들"
            onChange={handleLocalChange} />
        </label>
      </div>
      <div>
        <label>
          삭제할 패키지들:
          <textarea
            name="options.packages_to_remove"
            value={formData.options.packages_to_remove}
            placeholder="패키지들"
            onChange={handleLocalChange} />
        </label>
      </div>
      <div>
        <label>업데이트:</label>
        <select
          name="options.perform_update"
          value={formData.options.perform_update}
          onChange={handleLocalChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PackageManager;
