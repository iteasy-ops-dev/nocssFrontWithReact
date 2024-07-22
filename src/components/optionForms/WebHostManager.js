import React from 'react';

// TODO:
// user_id: "iteasy"
// user_pass: "iteasy"
// cband_limit: "3"
// disk_quota: "unlimited"
// vhost_domain: "example.com"
// listen_port: "80"
const WebHostManager = ({ formData, handleChange }) => {
  const handleLocalChange = (e) => {
    const { value } = e.target;
    // TODO: 각 데이터 패턴 체크하기
    handleChange(e); // 기존 핸들러 호출
  };

  return (
    <div>
      <h3>추가 옵션</h3>
      <div>
        <label>
          타입:
          <select value={formData.options.setup} onChange={handleLocalChange}>
            <option value="true">생성</option>
            <option value="false">삭제</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          생성ID:
          <input
            type="text"
            name="options.user_id"
            value={formData.options.user_id}
            onChange={handleLocalChange}
            placeholder="iteasy"
          />
        </label>
      </div>
      <div>
        <label>
          비밀번호:
          <input
            type="text"
            name="options.user_pass"
            value={formData.options.user_pass}
            onChange={handleLocalChange}
            placeholder="iteasy"
          />
        </label>
      </div>
      <div>
        <label>
          cband_limit:
          <input
            type="text"
            name="options.cband_limit"
            value={formData.options.cband_limit}
            onChange={handleLocalChange}
            placeholder="3"
          />
        </label>
      </div>
      <div>
        <label>
          disk_quota:
          <input
            type="text"
            name="options.disk_quota"
            value={formData.options.disk_quota}
            onChange={handleLocalChange}
            placeholder="unlimited"
          />
        </label>
      </div>
      <div>
        <label>
          vhost_domain:
          <input
            type="text"
            name="options.vhost_domain"
            value={formData.options.vhost_domain}
            onChange={handleLocalChange}
            placeholder="example.com"
          />
        </label>
      </div>
      <div>
        <label>
          listen_port:
          <input
            type="text"
            name="options.listen_port"
            value={formData.options.listen_port}
            onChange={handleLocalChange}
            placeholder="80"
          />
        </label>
      </div>
    </div>
  );
}

export default WebHostManager;
