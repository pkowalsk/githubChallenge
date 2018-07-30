import React from 'react';
import axios from 'axios';
import Pagination from 'rc-pagination';
import UserListRow from './UserListRow';

class HomePage extends React.Component {
  constructor(props, context) {
		super(props, context);

    // set current page of users
    this.currentPage = 1;

		this.state = {
      searchString: '',
      numResults: 0,
      showHideResults: 'hidden',
      users: [],
      pageSize: 25
    };

		// bind functions here, so they aren't rebound each time the dom is updated
		this.handleChange = this.handleChange.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.changePage = this.changePage.bind(this);
    this.startSearch = this.startSearch.bind(this);
	}

  // Loop through the ref's object, and bind each of them to onkeypress
  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeypress = (e) =>
      this._handleKeyPress(e, this.refs[x]);
    }
  }

  changePage(page) {
    // update the paging page and re-run the search
    this.currentPage = page;

    this.userSearch();
  }

  // set state whenever input is updated
  handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
  }

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  _handleKeyPress(e, field) {
    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission if button present

      // if we've hit enter from the search input, run the search
      if(field.name === 'searchString'){
        this.startSearch();
      }
    }
  }

  startSearch() {
    // new search, so reset to page 1
    this.currentPage = 1;

    this.userSearch();
  }

  userSearch() {
    let self = this;

    axios({
        method: 'get',
        url: 'https://api.github.com/search/users?q=' + this.state.searchString + '+in:login&page=' + this.currentPage + '&per_page=' + this.state.pageSize
    })
    .then(function(resp) {
      // once search has completed, so results div
      self.setState({
        numResults: resp.data.total_count,
        showHideResults: 'show',
        users: resp.data.items
      });
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  render() {
      return (
          <div>
              <h1>GitHub API Challenge</h1>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Username Search" ref="searchString" name="searchString" onChange={this.handleChange}/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" onClick={this.startSearch} >Search</button>
                </span>
              </div>

              <div id="searchResults" className={this.state.showHideResults}>
                <h3>{this.state.numResults} Records Found</h3>
                {this.state.users.map(user => <UserListRow key={user.id} user={user} />)}

                <Pagination
                  pageSize={this.state.pageSize}
                  onChange={this.changePage}
                  current={this.currentPage}
                  total={this.state.numResults}
                  showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} users`}
                  style={{paddingTop: 15}}/>
              </div>
          </div>
      );
  }
}

export default HomePage;
