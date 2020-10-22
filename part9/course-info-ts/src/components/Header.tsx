import React from 'react';

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.courseName}</h1>
}

export default Header
