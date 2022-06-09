import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Col
} from 'antd'


import { getSearchResults } from '../fetcher'
import MenuBar from '../components/MenuBar';

const bookColumns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'book_id',
    dataIndex: 'book_id',
    key: 'book_id',
    render: (book_id) => <a href={`/book/${book_id}`}>{book_id}</a>
  }
]

class SearchPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      titleResults: "",
      isbnResults:"",
      authorResults:"",
      limitResults: 100
    }

    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.handleTitleQueryChange = this.handleTitleQueryChange.bind(this)
    this.handleISBNQueryChange = this.handleISBNQueryChange.bind(this)
    this.handleAuthorQueryChange = this.handleAuthorQueryChange.bind(this)
    this.handleLimitQueryChange = this.handleLimitQueryChange.bind(this)
  }

  handleTitleQueryChange(event) {
      this.setState({ titleResults: event.target.value })
  }

  handleISBNQueryChange(event) {
      this.setState({ isbnResults: event.target.value })
  }

  handleAuthorQueryChange(event) {
      this.setState({ authorResults: event.target.value })
  }

  handleLimitQueryChange(event) {
      this.setState({ limitResults: event.target.value })
  }

  updateSearchResults() {
    getSearchResults(this.state.titleResults, this.state.isbnResults, this.state.authorResults, this.state.limitResults).then(res =>{
      this.setState({ searchResults: res.result })
      console.log(res)
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Col flex={2}>
            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Title</label>
              <FormInput placeholder="Book Title" value={this.state.titleResults} onChange={this.handleTitleQueryChange} />
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>ISBN</label>
              <FormInput placeholder="ISBN" value={this.state.isbnResults} onChange={this.handleISBNQueryChange} />
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Author Name</label>
              <FormInput placeholder="Author" value={this.state.authorResults} onChange={this.handleAuthorQueryChange} />
            </FormGroup>
          </Col>
          <Col flex={2}>
            <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Limit</label>
              <FormInput placeholder="Number of Results" value={this.state.limitResults} onChange={this.handleLimitQueryChange} />
            </FormGroup>
          </Col>
          <Col flex={2}><FormGroup style={{ width: '10vw' }}>
            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
          </FormGroup></Col>
        </Form> 
        <Table dataSource={this.state.searchResults} columns={bookColumns} />
      </div>
    );
  }

}

export default SearchPage