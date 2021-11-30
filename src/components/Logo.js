import React from 'react';

const Logo = (props) => {
  return (
    // <img
    //   alt="Logo"
    //   src="/static/ums_logo.png"
    //   {...props}
    // />
    <span {...props} style={{ color: '#fff', fontSize: '30px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>College Management System</span>
  );
};

export default Logo;
