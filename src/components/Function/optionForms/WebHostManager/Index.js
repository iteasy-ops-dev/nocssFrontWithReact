import React, { useState, useEffect } from 'react';
import ErpParser from '../ErpParser/Index';
import OptionSelect from './optionFields/OptionSelect';
import SetupFields from './optionFields/SetupFields';
import DeleteFields from './optionFields/DeleteFields'

const WebHostManager = ({ formData, handleChange }) => {
  const [setupType, setSetupType] = useState(formData.options.setup || "true");

  // ERP 데이터 상태 추가
  const [erpData, setErpData] = useState({});

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    // console.log(`handleLocalChange => ${name}: ${value}`)
    setErpData({
      name: value
    })
    handleChange(e);
    if (name === 'options.setup') {
      setSetupType(value);
    }
  };

  const handleDataFetch = (data) => {
    const mappedData = {
      user_id: data.Info.UserID || "",
      user_pass: data.Info.UserPass || "",
      disk_quota: data.Info.DiskQuota || "",
      cband_limit: data.Info.CbandLimit || "",
      vhost_domain: data.Info.VhostDomain || "",
      db_user: data.Info.DBUser || "",
      db_password: data.Info.DBPassword || "",
      db_name: data.Info.DBName || "",
    };
    // ERP 데이터를 formData로 반영
    handleChange({
      target: {
        name: 'options',
        value: { ...formData.options, ...mappedData }
      }
    });
    setErpData(mappedData)
  };

  // ERP 데이터가 업데이트될 때마다 formData에 반영
  useEffect(() => {
    handleChange({
      target: {
        name: 'options',
        value: { ...formData.options, ...erpData }
      }
    });
  }, [erpData]);

  return (
    <div>
      <h3>추가 옵션</h3>
      <ErpParser onDataFetch={handleDataFetch} />
      <hr></hr>
      <OptionSelect
        setupType={setupType}
        onChange={handleLocalChange}
      />
      {setupType === "true" && (
        <SetupFields
          formData={{ ...formData, options: { ...formData.options, ...erpData } }}
          onChange={handleLocalChange}
        />
      )}
      {setupType === "false" && (
        <DeleteFields
          formData={formData}
          onChange={handleLocalChange}
        />
      )}
    </div>
  );
}

export default WebHostManager;

