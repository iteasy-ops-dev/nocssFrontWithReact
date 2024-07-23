import React, { useState } from 'react';

const SetupFields = ({ formData, onChange }) => {
  // State to manage whether to show the database options
  const [showDbOptions, setShowDbOptions] = useState(false);
  const [showQuotaOptions, setShowQuotaOptions] = useState(false);

  // Handler for the checkbox to toggle the database options
  const handleDbOptionsToggle = () => {
    setShowDbOptions(!showDbOptions);
  };
  const handleQuotaOptions = () => {
    setShowQuotaOptions(!showQuotaOptions)
  };

  return (
    <div>
      <div>
        <label>
          생성 계정:
          <input
            type="text"
            name="options.user_id"
            value={formData.options.user_id}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            placeholder="3"
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
            onChange={onChange}
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
            onChange={onChange}
            placeholder="80"
          />
        </label>
      </div>
      <div>
        <label>
          Quota옵션 보기:
          <input
            type="checkbox"
            checked={showQuotaOptions}
            onChange={handleQuotaOptions}
          />
        </label>
      </div>
      {showQuotaOptions && (
        <>
         <div>
            <label>
              Quata Limit:
              <input
                type="text"
                name="options.disk_quota"
                value={formData.options.disk_quota}
                onChange={onChange}
                placeholder="unlimited"
              />
            </label>
          </div>
        </>
      )}
      <div>
        <label>
          DB옵션 보기:
          <input
            type="checkbox"
            checked={showDbOptions}
            onChange={handleDbOptionsToggle}
          />
        </label>
      </div>
      {showDbOptions && (
        <>
          <div>
            <label>
              db admin:
              <input
                type="text"
                name="options.mysql_root_user"
                value={formData.options.mysql_root_user}
                onChange={onChange}
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
                onChange={onChange}
                placeholder="mysql_root_password"
              />
            </label>
          </div>
          <div>
            <label>
              db 계정:
              <input
                type="text"
                name="options.db_user"
                value={formData.options.db_user}
                onChange={onChange}
                placeholder="db_user"
              />
            </label>
          </div>
          <div>
            <label>
              db 계정 비밀번호:
              <input
                type="text"
                name="options.db_password"
                value={formData.options.db_password}
                onChange={onChange}
                placeholder="db_password"
              />
            </label>
          </div>
          <div>
            <label>
              db 이름:
              <input
                type="text"
                name="options.db_name"
                value={formData.options.db_name}
                onChange={onChange}
                placeholder="db_name"
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default SetupFields;

