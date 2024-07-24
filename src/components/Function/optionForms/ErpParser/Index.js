import React, { useState } from 'react';
import { fetchErpParser } from "../../../../utils/apiUtils";

const ErpParser = ({ onDataFetch }) => {
  const [url, setUrl] = useState('');

  // Button click handler
  const handleButtonClick = async () => {
		if (url === "") {
			return
		}
    const data = await fetchErpParser(url);
    onDataFetch(data); // 상위 컴포넌트에 데이터 전달
  };

  // Handle input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'url') {
      setUrl(value);
    }
  };

  return (
    <div>
      <div>
        <label>
          작업의뢰 url(테스트중입니다):
          <input
            type="text"
            name="url"
            value={url}
            onChange={onChange}
          />
        </label>
        <button type="button" onClick={handleButtonClick}>정보 가져오기</button>
      </div>
    </div>
  );
};

export default ErpParser;
