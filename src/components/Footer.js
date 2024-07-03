import React from 'react';

const Footer = () => {
  const adminEmail = "iteasy.ops.dev@gmail.com";
  const adminName = "ITEASY Service Ops Center";

  return (
    <footer>
      <hr />
      <p>Contact Information:</p>
      <p>{adminName} - <a href={`mailto:${adminEmail}`}>{adminEmail}</a></p>
    </footer>
  );
};

export default Footer;