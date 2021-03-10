import React from 'react';

const User = ({name, email, role}) => {
    return (
        <React.Fragment>
            <p>{name}</p>
            <p>{email}</p>
            <p>{role}</p>
        </React.Fragment>
    );
};

export default User;