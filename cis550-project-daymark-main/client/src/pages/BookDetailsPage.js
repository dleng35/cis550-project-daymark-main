import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Col
} from 'antd'

import { getSimilarBooks, getBookDetail } from '../fetcher'
import MenuBar from '../components/MenuBar';
import queryString from 'query-string'

const detailBookColumns = [
  {
    title: 'image_url',
    dataIndex: 'image_url',
    key:'image_url',
    render: text => <img src={text} alt="" />
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'isbn',
    dataIndex: 'isbn',
    key: 'isbn'
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'format',
    dataIndex: 'format',
    key: 'format'
  },
  {
    title: 'publisher',
    dataIndex: 'publisher',
    key: 'publisher'
  },
  {
    title: 'num_pages',
    dataIndex: 'num_pages',
    key: 'num_pages'
  },
  {
    title: 'pub_year',
    dataIndex: 'pub_year',
    key: 'pub_year'
  },
]

const similarBookColumns = [
  {
    title: 'book_id',
    dataIndex: 'book_id',
    key:'book_id',
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title'
  }
]

class BookDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      bookDetail: [],
      similarBooks: [],
    }
  }

  componentDidMount() {
    const segment = new 
    URL(window.location.href).pathname.split('/').filter(Boolean).pop();
    console.log(segment);

    getBookDetail(segment).then(res => {
      console.log(res)
      this.setState({ bookDetail: res.result })
    })

    getSimilarBooks(segment, 50).then(res => {
      console.log(res)
      this.setState({ similarBooks: res.result })
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <h3 style={{textAlign: "center"}}>Book Details</h3>
        <Table dataSource={this.state.bookDetail} columns={detailBookColumns} />
        <h3 style={{textAlign: "center"}}>Similar Book</h3>
        <Table dataSource={this.state.similarBooks} columns={similarBookColumns} />
      </div>
    );
  }
}

export default BookDetail