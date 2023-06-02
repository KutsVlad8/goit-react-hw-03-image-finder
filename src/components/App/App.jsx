import { Component } from 'react';
// import {} from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';
export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
