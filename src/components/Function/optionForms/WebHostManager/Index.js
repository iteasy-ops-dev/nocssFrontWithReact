// import React, { useState } from 'react';
// import ErpParser from '../ErpParser/Index';
// import OptionSelect from './optionFields/OptionSelect';
// import SetupFields from './optionFields/SetupFields';
// import DeleteFields from './optionFields/DeleteFields';

// const WebHostManager = ({ formData, handleChange }) => {
//   const [setupType, setSetupType] = useState(formData.options.setup || "true");
//   const [erpData, setErpData] = useState({}); // ERP 데이터 상태 추가

//   const handleLocalChange = (e) => {
//     const { name, value } = e.target;
//     handleChange(e);
//     if (name === 'options.setup') {
//       setSetupType(value); // 'setup' 옵션이 변경되면 상태를 업데이트
//     }
//   };

//   // TODO: 필드에 값은 정상적으로 들어오나 formdata에 제대로 들어가지 않음
//   // TODO: 정보를 가져온 이후로 필드의 값이 수정이 안됨.

//   const handleDataFetch = (data) => {
//     // setErpData(data); // ERP 데이터 상태 업데이트
//     // console.log(erpData)
//     // ERP 데이터 매핑
//     const mappedData = {
//       user_id: data.Info.UserID || "",
//       user_pass: data.Info.UserPass || "",
//       disk_quota: data.Info.DiskQuota || "",
//       cband_limit: data.Info.CbandLimit || "",
//       vhost_domain: data.Info.VhostDomain || "",
//       db_user: data.Info.DBUser || "",
//       db_password: data.Info.DBPassword || "",
//       db_name: data.Info.DBName || "",
//       // setupType도 포함될 수 있습니다
//     };
//     setErpData(mappedData); // ERP 데이터 상태 업데이트
//   };

//   return (
//     <div>
//       <h3>추가 옵션</h3>
//       <ErpParser onDataFetch={handleDataFetch} />
//       <hr></hr>
//       <OptionSelect
//         setupType={setupType}
//         onChange={handleLocalChange}
//       />
//       {setupType === "true" && (
//         <SetupFields
//           // formData={formData}
//           formData={{ ...formData, options: { ...formData.options, ...erpData } }} // ERP 데이터가 반영된 formData 전달
//           onChange={handleLocalChange}
//         />
//       )}
//       {setupType === "false" && (
//         <DeleteFields
//           formData={formData}
//           onChange={handleLocalChange}
//         />
//       )}
//     </div>
//   );
// }

// export default WebHostManager;
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

