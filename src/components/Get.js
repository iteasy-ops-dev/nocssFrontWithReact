import React, { useState, useEffect } from 'react';
import { fetchProcessData } from "../utils/apiUtils";

function Get({func}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 검색 필터 상태
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');
  const [duration, setDuration] = useState('');
  const [comparison, setComparison] = useState(''); // 예: 'gt', 'lt', 'gte', 'lte'

  useEffect(() => {
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
      }
    };

    fetchData();
  }, [type, name, account, status, duration, comparison]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Ansible Process Status</h2>
      <form onSubmit={(e) => { e.preventDefault(); }}>
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
            Name:
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
              <option value="">Any</option>
              <option value="false">실패</option>
              <option value="true">성공</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Duration:
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Comparison:
            <select value={comparison} onChange={(e) => setComparison(e.target.value)}>
              <option value="">Any</option>
              <option value="gt">Greater than</option>
              <option value="lt">Less than</option>
              <option value="gte">Greater than or equal to</option>
              <option value="lte">Less than or equal to</option>
            </select>
          </label>
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Account</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.ID}>
              <td>{item.Type}</td>
              <td>{item.Name}</td>
              <td>{item.Account}</td>
              <td>{item.Status ? '🟢' : '🔴'}</td>
              <td>{new Date(item.Timestamp * 1000).toLocaleString()}</td>
              <td>{item.Duration}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Get;
