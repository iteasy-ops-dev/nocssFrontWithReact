import React from 'react';

const ChangeSslForm = ({ formData, handleChange }) => {
	const handleLocalChange = (e) => {
		// const { value } = e.target;
		// if (!validateDomain(value)) {
		//   alert('정상적인 도메인이 아닙니다.');
		//   return
		// } 
		handleChange(e); // 기존 핸들러 호출
	};

	return (
		<div>
			<h3>추가 옵션</h3>
			<div>
				<label>
					도메인: <input type="text" name="options.domain" value={formData.options.domain} placeholder="도메인" onChange={handleLocalChange} required />
				</label>
			</div>
		</div>
	);
}

export default ChangeSslForm