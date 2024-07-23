import React from 'react';

const ChangePasswordForm = ({ formData, handleChange }) => {
	return (
		<div>
			<h3>추가 옵션</h3>
			<div>
				<label>
					계정:
					<input
						type="text"
						name="options.account"
						value={formData.options.account}
						placeholder="패스워드 바꿀 계정"
						onChange={handleChange}
						required />
				</label>
			</div>
			<div>
				<label>
					바꿀 비밀번호:
					<input
						type="password"
						name="options.change_password"
						value={formData.options.change_password || ''}
						placeholder="바꿀 패스워드"
						onChange={handleChange}
						required />
				</label>
			</div>
		</div>
	);
}

export default ChangePasswordForm