import React from 'react';

const ChangeSslForm = ({ formData, handleChange }) => {
	const handleLocalFileChange = (e) => {
		const files = Array.from(e.target.files);

		// Update formData with files as a new key-value pair
		handleChange({
			target: {
				name: 'options.files',
				value: files
			}
		});
	}

	const handleLocalChange = (e) => {
		handleChange(e);
	};

	return (
		<div>
			<h3>추가 옵션</h3>
			<div>
				<label>도메인:
					<input
						type="text"
						name="options.domain"
						value={formData.options.domain}
						placeholder="도메인"
						onChange={handleLocalChange}
						required />
				</label>
			</div>
			<div>
				<label>키파일:
					<input
						type="file"
						name="options.files"
						onChange={handleLocalFileChange}
						accept='.pem'
						multiple 
						required />
				</label>
			</div>
		</div>
	);
}

export default ChangeSslForm