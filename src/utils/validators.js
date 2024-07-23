export const validateIp = (ip) => {
  const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?$/;
  return ipPattern.test(ip);
}

export function validateAccount(account) {
  return /^[a-zA-Z0-9_]+$/.test(account);
}

export const validatePort = (port) => {
  const portNumber = parseInt(port, 10);
  return portNumber >= 1 && portNumber <= 65535;
};

export const validateEqual = (key1, key2) => {
  return key1 === key2
}

export const validateDomain = (domain) => {
  const domainPattern = /([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/
  return domainPattern.test(domain);
}

export const validateDBPassword = (password) => {
  if (password !== undefined) {
    // 비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 한다
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }
  return true
}
