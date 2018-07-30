import React from 'react';
import { Link } from 'react-router-dom';

const UserListRow = ({ user }) => {
    return (
        <div className="row userRow">
            <div className="col-md-4 userDetails">
                <img src={user.avatar_url} className="avatar" />
                <Link to={'/user/' + user.login}>
                    {user.login}
                </Link>
            </div>
        </div>
    );
};

export default UserListRow;
