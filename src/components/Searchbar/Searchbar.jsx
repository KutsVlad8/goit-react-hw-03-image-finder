import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import Notiflix from 'notiflix';
// import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  changeInput = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const trimQuery = this.state.query.trim();

    if (trimQuery === '') {
      Notiflix.Notify.failure('Поле ввода пустое');
      return;
    }
    // Notiflix.Notify.success(`вот что мы нашли по запросу ${this.state.query}`);
    this.props.onSubmit(trimQuery);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="query"
            value={this.state.query}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeInput}
          />
        </SearchForm>
      </Header>
    );
  }
}
