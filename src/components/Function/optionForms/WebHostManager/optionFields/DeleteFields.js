import React, { useState } from 'react';

const DeleteFields = ({ formData, onChange }) => {
  // State to manage whether to show the database options
  const [showDbOptions, setShowDbOptions] = useState(false);

  // Handler for the checkbox to toggle the database options
  const handleDbOptionsToggle = () => {
    setShowDbOptions(!showDbOptions);
  };

  return (
    <div>
      <div>
        <label>
          삭제할 계정:
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
}

export default DeleteFields;
