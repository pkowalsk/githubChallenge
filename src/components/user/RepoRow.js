import React from 'react';

const UserListRow = ({ repo }) => {
    return (
        <div className="row userRow">
            <div className="col-md-12 userDetails">
                <h4 className="repoName">
                  <a href={repo.html_url} target="_blank">{repo.name}</a>
                </h4>

                <div className="row">
                  <div className="col-md-12">
                    {repo.description}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className={repo.open_issues_count > 0 ? `issueList hasIssues`:`issueList`}>
                      {repo.open_issues_count} Open Issues
                    </div>
                    
                    Language: {repo.language}
                  </div>
                </div>
            </div>
        </div>
    );
};

export default UserListRow;
