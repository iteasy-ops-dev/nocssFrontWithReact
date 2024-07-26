import React, { useState, useEffect } from 'react';

import ResponseView from "../ResponseView"
import ChangePasswordForm from "./optionForms/ChangePasswordForm/Index"
import ChangeSshPortForm from "./optionForms/ChangeSshPortForm/Index"
import ChangeSslForm from "./optionForms/ChangeSslForm/Index"
import InstallApacheForm from "./optionForms/InstallApacheForm/Index"
import PackageManager from "./optionForms/PackageManager/Index"
import WebHostManager from "./optionForms/WebHostManager/Index"

import { excuteAnsible } from "../../utils/apiUtils";
import { validateIp, validateAccount, validateDBPassword } from "../../utils/validators";

const FunctionForm = ({ func, onBack }) => {
  const [user, setUser] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    {
      type: func,
      name: '',
      account: '',
      password: '',
      ips: '',
      options: {}
    });

  useEffect(() => {
    const jwtCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (jwtCookie) {
      const jwt = jwtCookie.split('=')[1];
      const jwtParts = jwt.split('.');
      if (jwtParts.length === 3) {
        const decodedPayload = JSON.parse(atob(jwtParts[1]));
        setUser(decodedPayload);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    // loading 상태가 변할 때마다 실행될 코드
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer); // cleanup 함수
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("options.")) {
      const optionName = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        options: {
          ...prevFormData.options,
          [optionName]: value,
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    // 폼데이터 확인
    // console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 이미 loading 중이면 중복 처리 방지

    const formDataToSend = {
      ...formData,
      name: user.email,
      ips: formData.ips.split(/[\n,]+/).map(ip => ip.trim()).filter(ip => ip)
    };
    
    if (!formDataToSend.ips.every(validateIp)) {
      alert("잘못된 IP 주소가 포함되어 있습니다.");
      return;
    }
    if (!validateAccount(formDataToSend.account)) {
      alert("잘못된 계정 정보입니다.");
      return;
    }
    if (!validateDBPassword(formDataToSend.options.db_password)) {
      alert("DB 비밀번호 기준에 맞지 않습니다.");
      return;
    }

    setLoading(true);

    try {
      const response = await excuteAnsible(formDataToSend);
      setResponseData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("데이터를 가져오는 동안 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setElapsedTime(0)
    }
  };

  return (
    <div>
      <h2>{func}</h2>
      <h3>접속 정보</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>계정:
            <input
              type="text"
              name="account"
              value={formData.account}
              placeholder="계정"
              onChange={handleChange}
              required />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              placeholder="계정 비밀번호"
              value={formData.password}
              onChange={handleChange}
              required />
          </label>
        </div>
        <div>
          <label>
            원격서버IP:
            <textarea
              name="ips"
              value={formData.ips}
              placeholder="원격 서버 IP들"
              onChange={handleChange}
              required />
          </label>
        </div>
        <hr />
        {/* 추가 옵션 확장 */}
        {func === "change_password" ? <ChangePasswordForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "change_ssh_port" ? <ChangeSshPortForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "change_ssl" ? <ChangeSslForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "install_apache" ? <InstallApacheForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "package_manager" ? <PackageManager formData={formData} handleChange={handleChange} required /> : null}
        {func === "webhost_manager" ? <WebHostManager formData={formData} handleChange={handleChange} required /> : null}
        {/* 추가 옵션 확장 */}
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      <button onClick={onBack} disabled={loading}>Back</button>
      {loading && (
        <div>
          <p>⏰ Loading... {elapsedTime} seconds</p>
        </div>
      )}
      {!loading && responseData && (
        <ResponseView responseData={responseData} />
      )}
    </div>
  );
};

export default FunctionForm;
