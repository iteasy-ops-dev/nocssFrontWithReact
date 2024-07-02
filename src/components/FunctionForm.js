import React, { useState } from 'react';
import api from "../utils/api"

import ResponseView from "./ResponseView"
import ChangePasswordForm from "./optionForms/ChangePasswordForm"
import ChangeSshPortForm from "./optionForms/ChangeSshPortForm"
import ChangeSslForm from "./optionForms/ChangeSslForm"
import InstallApacheForm from "./optionForms/InstallApacheForm"

import { validateIp, validateAccount } from "../utils/validators";

const FunctionForm = ({ func, onBack }) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      ips: formData.ips.split(/[\n,]+/).map(ip => ip.trim()).filter(ip => ip)
    };
    // console.log('Submitting form data:', formDataToSend);
    if (!formDataToSend.ips.every(validateIp)) {
      alert("ip 잘못")
      return
    }
    if (!validateAccount(formDataToSend.account)) {
      alert("계정 잘못")
      return
    }

    setLoading(true);
    const startTime = Date.now();

    // 타이머 시작
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    try {
      const response = await api.post('/getparam', formDataToSend);
      console.log(response.data)
      // return response.data;
      setResponseData(response.data)
      setLoading(false); // 데이터 패칭 종료
      clearInterval(timer)
    } catch (error) {
      setLoading(false); // 데이터 패칭 종료
      clearInterval(timer)
      throw error;
    }
  };

  return (
    <div>
      <h2>{func}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>작업자:
            <input type="text" name="name" value={formData.name} placeholder="작업자 이름" onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>계정:
            <input type="text" name="account" value={formData.account} placeholder="계정" onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            비밀번호: <input type="password" name="password" placeholder="계정 비밀번호" value={formData.password} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            원격서버IP: <textarea name="ips" value={formData.ips} placeholder="원격 서버 IP들" onChange={handleChange} required />
          </label>
        </div>
        <hr />
        {/* 추가 옵션 확장 */}
        {func === "change_password" ? <ChangePasswordForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "change_ssh_port" ? <ChangeSshPortForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "change_ssl" ? <ChangeSslForm formData={formData} handleChange={handleChange} required /> : null}
        {func === "install_apache" ? <InstallApacheForm formData={formData} handleChange={handleChange} required /> : null}
        {/* 추가 옵션 확장 */}
        <button type="submit">Submit</button>
      </form>
      <button onClick={onBack}>Back</button>
      {loading ? (
        <div>
          <p>Loading...{elapsedTime} seconds</p>
        </div>
      ) : (
        <p></p>
      )}
      {responseData && (
          <ResponseView responseData={responseData}/>
      )}
    </div>
  );
};


export default FunctionForm;