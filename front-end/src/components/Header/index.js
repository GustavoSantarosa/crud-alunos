import React from 'react';

const Header = ({title}) => (
    <header>
        <h1>{title?title:'Escolha um Titulo'}</h1>
    </header>
);

export default Header;