import React from 'react';

const ResponseView = ({ responseData }) => {

	return (
		<div>
			<h3>{responseData.Type} {responseData.Status ? "성공✅" : "실패❌: 아래 로그 확인하세요."}</h3>
			<pre>{responseData.Payload}</pre>
		</div>
	);
}

export default ResponseView