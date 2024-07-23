import React from 'react';

// TODO:
// user_id: "iteasy"
// user_pass: "iteasy"
// cband_limit: "3"
// disk_quota: "unlimited"
// vhost_domain: "example.com"
// listen_port: "80"

// mysql_root_user: "root"
// mysql_root_password: "1123"
// db_user: "iteasy_db_user"
// db_name: "iteasy_db"
// db_password: "iteasy_pwd"
const WebHostManager = ({ formData, handleChange }) => {
  const handleLocalChange = (e) => {
    // const { value } = e.target;
    // TODO: 각 데이터 패턴 체크하기
    handleChange(e); // 기존 핸들러 호출
  };

  return (
    <div>
      <h3>추가 옵션</h3>
      <div>
        <label>
          타입:
          <select
            name="options.setup"
            value={formData.options.setup}
            onChange={handleLocalChange}>
            <option value="true">생성</option>
            <option value="false">삭제</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          생성 계정:
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
          계정 비밀번호:
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
          db admin:
          <input
            type="text"
            name="options.mysql_root_user"
            value={formData.options.mysql_root_user}
            onChange={handleLocalChange}
            placeholder="root"
          />
        </label>
      </div>
      <div>
        <label>
          db admin 비밀번호:
          <input
            type="text"
            name="options.mysql_root_password"
            value={formData.options.mysql_root_password}
            onChange={handleLocalChange}
            placeholder="mysql_root_password"
          />
        </label>
      </div>
      <div>
        <label>
          db 생성 계졍:
          <input
            type="text"
            name="options.db_user"
            value={formData.options.db_user}
            onChange={handleLocalChange}
            placeholder="db_user"
          />
        </label>
      </div>
      <div>
        <label>
          db 생성 계정 비밀번호:
          <input
            type="text"
            name="options.db_password"
            value={formData.options.db_password}
            onChange={handleLocalChange}
            placeholder="db_password"
          />
        </label>
      </div>
      <div>
        <label>
          db 생성 이름:
          <input
            type="text"
            name="options.db_name"
            value={formData.options.db_name}
            onChange={handleLocalChange}
            placeholder="db_name"
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
      {/* <div>
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
      </div> */}
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
