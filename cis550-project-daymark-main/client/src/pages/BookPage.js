import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Col
} from 'antd'


import { getFrontPageBooks, getTopBooks } from '../fetcher'
import MenuBar from '../components/MenuBar';
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const bookColumns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'image_url',
    dataIndex: 'image_url',
    key:'image_url',
    render: text => <img src={text} alt="" />
  }
]

const topBookColumns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'book_id',
    dataIndex: 'book_id',
    key: 'book_id'
  },
  {
    title: 'score',
    dataIndex: 'score',
    key: 'score'
  }
]

class BookPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      booksResults: [],
      topBooksResults: [],
      topResults: ""
    }

    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.handleTopBookChoiceChange = this.handleTopBookChoiceChange.bind(this)
  }

  handleTopBookChoiceChange(event) {
    this.setState({ topResults: event.target.value })
  }

  updateSearchResults() {
    getTopBooks(this.state.topResults).then(res =>{
      this.setState({ topBooksResults: res.result })
      console.log(res)
    })
  }

  componentDidMount() {
    getFrontPageBooks().then(res => {
      console.log(res)
      this.setState({ booksResults: res.result })
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Col flex={2}>
            {/*<FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Most popular (Count) or highest rating (Avg)</label>
              <FormInput placeholder="avg or count" value={this.state.topResults} onChange={this.handleTopBookChoiceChange} />
            </FormGroup>*/}
            <p>choose an option</p>
            <label>
              <select onChange={this.handleTopBookChoiceChange}>
                <option value="count">Most Popular Books</option>
                <option value="avg">Higest Rated Books</option>
              </select>
            </label>
          </Col>
          <Col flex={2}><FormGroup style={{ width: '10vw' }}>
            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
          </FormGroup></Col>
        </Form>
        <Table dataSource={this.state.topBooksResults} columns={topBookColumns} />
        <p> </p>
        <h3 style={{textAlign: "center"}}>Other Amazing Titles</h3>
        <Table dataSource={this.state.booksResults} columns={bookColumns} />
      </div>
    );
  }

}

export default BookPage