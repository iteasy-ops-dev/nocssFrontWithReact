import React from 'react';

const DeleteFields = ({ formData, onChange }) => {
  return (
    <div>
      <div>
        <label>
          삭제할 계정:
          <input
            type="text"
            name="options.delete_user_id"
            value={formData.options.delete_user_id}
            onChange={onChange}
            placeholder="delete_user"
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
          삭제할 db 이름:
          <input
            type="text"
            name="options.delete_db_name"
            value={formData.options.delete_db_name}
            onChange={onChange}
            placeholder="delete_db_name"
          />
        </label>
      </div>
    </div>
  );
}

export default DeleteFields;
