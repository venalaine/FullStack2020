import React from "react";

const Header: React.FC<{ courseName: string }> = ( {courseName} ) => (
    <h1>Hello, {courseName}</h1>
  );

export default Header;  
  