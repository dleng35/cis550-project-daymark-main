import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Col
} from 'antd'

import { getSimilarAuthors } from '../fetcher'
import MenuBar from '../components/MenuBar';

const authorColumns = [
  {
    title: 'author_id',
    dataIndex: 'author_id',
    key: 'author_id',
    render: (author_id) => <a href={`/author/similar/${author_id}`}>{author_id}</a>
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name'
  }
]

class SimilarAuthor extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      similarAuthors: [],
      similarAuthorID: ""
    }
  }

  componentDidMount() {
    const segment = new 
    URL(window.location.href).pathname.split('/').filter(Boolean).pop();
    console.log(segment);

    getSimilarAuthors(segment, 50).then(res => {
      console.log(res)
      this.setState({ similarAuthors: res.result })
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <h3 style={{textAlign: "center"}}>Similar Authors</h3>
        <Table dataSource={this.state.similarAuthors} columns={authorColumns} />
      </div>
    );
  }
}

export default SimilarAuthor