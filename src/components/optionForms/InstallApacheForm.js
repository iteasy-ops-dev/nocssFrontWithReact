import React from 'react';

const InstallApacheForm = ({ formData, handleChange }) => {
	const handleLocalChange = (e) => {
		// const { value } = e.target;

		handleChange(e); // 기존 핸들러 호출
	};

	return (
		<div>
			<h3>추가 옵션</h3>
			<div>
				<label>
					포트: <input type="text" name="options.apache_listen_port" value={formData.options.apache_listen_port} placeholder="도메인" onChange={handleLocalChange} required />
				</label>
				<label>
					도메인: <input type="text" name="options.domain" value={formData.options.domain} placeholder="도메인" onChange={handleLocalChange} required />
				</label>
			</div>
		</div>
	);
}

export default InstallApacheForm