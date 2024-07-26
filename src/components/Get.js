import React, { useState, useEffect } from 'react';
import { fetchProcessData } from "../utils/apiUtils";

function Get({ func }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 검색 필터 상태
  // TODO: 검색 필터를 백앤드 참조하여 더 정교하게 만들기
  // TODO: 페이징을 할 것인가?
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');
  const [duration, setDuration] = useState('');
  const [comparison, setComparison] = useState(''); // 예: 'gt', 'lt', 'gte', 'lte'

  const fetchData = async () => {
    setLoading(true);

    try {
      // API 호출
      const response = await fetchProcessData({
        params: {
          type: type,
          name: name,
          account: account,
          status: status,
          duration: duration,
          comparison: comparison
        }
      });

      // 데이터 설정
      setData(response);
      setLoading(false);
    } catch (error) {
      // 오류 처리
      setError(error.message);
      setLoading(false);
      setData([])
      alert("에러")
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, status, comparison]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("get submit")
    fetchData();
  }

  // TODO: IP 관련 데이터 표시를 어떻게 할 것인가
  return (
    <div>
      <h2>Ansible Process Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value={""}>-</option>
              {func.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Worker:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Account:
            <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="true">성공</option>
              <option value="false">실패</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Duration:
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <select value={comparison} onChange={(e) => setComparison(e.target.value)}>
              <option value="">Comparison</option>
              <option value="gt">Greater than</option>
              <option value="lt">Less than</option>
              <option value="gte">Greater than or equal to</option>
              <option value="lte">Less than or equal to</option>
            </select>
          </label>
        </div>
        {/* <div>
          <label>
            Comparison:
            <select value={comparison} onChange={(e) => setComparison(e.target.value)}>
              <option value="">-</option>
              <option value="gt">Greater than</option>
              <option value="lt">Less than</option>
              <option value="gte">Greater than or equal to</option>
              <option value="lte">Less than or equal to</option>
            </select>
          </label>
        </div> */}
        <div>
          <button type="submit">Search</button>
        </div>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>총 작업 갯수</th>
              <th>총 소요 시간</th>
              <th>평균 소요 시간</th>
            </tr>
          </thead>
          <tbody>
            <td>{data.length}</td>
            <td>{data.reduce((accumulator, item) => accumulator + item.Duration, 0)}s</td>
            {/* TODO: 이거 왜 useState 사용하면 이상하게 되냐? 내가 계산 잘못 한줄*/}
            <td>{data.reduce((accumulator, item) => accumulator + item.Duration, 0) / data.length}s</td>
          </tbody>
        </table>
      </div>

      <table>
        <thead>
          <tr>
            <th>📋 Type</th>
            <th>⚙️ Worker</th>
            <th>🕺 Account</th>
            <th>⭕️ Status</th>
            <th>📅 Timestamp</th>
            <th>⏰ Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.ID}>
              <td>📋 {item.Type}</td>
              <td>⚙️ {item.Name}</td>
              <td>🕺 {item.Account}</td>
              <td>{item.Status ? '🟢' : '🔴'}</td>
              <td>📅 {new Date(item.Timestamp * 1000).toLocaleString()}</td>
              <td>⏰ {item.Duration}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Get;
