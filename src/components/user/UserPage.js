import React from 'react';
import axios from 'axios';
import RepoRow from './RepoRow';

class UserPage extends React.Component {
  constructor(props, context) {
		super(props, context);

		this.state = {
        repos: [],
        login: props.match.params.login,
        avatar: '',
        githubUrl: ''
    };

    // bind functions here, so they aren't rebound each time the dom is updated
		this.getUserInfo = this.getUserInfo.bind(this);

    // get user url and avatar
    this.getUserInfo();
  }

  getUserInfo() {
    // search for user information
    let self = this;

    axios({
        method: 'get',
        url: 'https://api.github.com/users/' + this.state.login
    })
    .then(function(resp) {
      self.setState({
        avatar: resp.data.avatar_url,
        githubUrl: resp.data.html_url
      });
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  componentDidMount() {
    // search for user repos once component is mounted and display them
    let self = this;

    axios({
        method: 'get',
        url: 'https://api.github.com/search/repositories?q=user:' + this.state.login
    })
    .then(function(resp) {
      self.setState({
        repos: resp.data.items,
        avatar: resp.data.items[0].owner.avatar_url,
        githubUrl: resp.data.items[0].owner.html_url
      });
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  render() {
      return (
          <div>
              <h1>
                <img src={this.state.avatar} className="avatarLarge" />
                <a href={this.state.githubUrl} target="_blank">
                  {this.state.login}
                </a> GitHub Information
              </h1>

              <div>
                {this.state.repos.length} Repos

                {this.state.repos.map(repo => <RepoRow key={repo.id} repo={repo} />)}
              </div>
          </div>
      );
  }
}

export default UserPage;
