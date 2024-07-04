import React from 'react';
import { validatePort } from '../../utils/validators'

const ChangeSshPortForm = ({ formData, handleChange }) => {
  const handleLocalChange = (e) => {
    const { value } = e.target;
    if (!validatePort(value)) {
      alert('포트 번호는 1에서 65535 사이여야 합니다.');
      return
    }
    handleChange(e); // 기존 핸들러 호출
  };

  return (
    <div>
      <h3>추가 옵션</h3>
      <div>
        <label>
          포트번호:
          <input
            type="text"
            name="options.new_port"
            value={formData.options.new_port}
            placeholder="바꿀 포트 번호"
            onChange={handleLocalChange}
            required />
        </label>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <h3>추가 옵션</h3>
  //     <div>
  //       <label>
  //         포트번호: <input type="text" name="options.NEW_PORT" value={formData.options.NEW_PORT} placeholder="바꿀 포트 번호" onChange={handleChange} required/>
  //       </label>
  //     </div>
  //   </div>
  // );
}

export default ChangeSshPortForm