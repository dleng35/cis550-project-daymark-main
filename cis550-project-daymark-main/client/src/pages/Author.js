import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Col,
  Menu,
  Dropdown, 
} from 'antd'


import { getTopAuthors } from '../fetcher'
import MenuBar from '../components/MenuBar';

const authorColumns = [
  {
    title: 'author_id',
    dataIndex: 'author_id',
    key: 'author_id',
    render: (author_id) => <a href={`/author/similar/${author_id}?limit=5`}>{author_id}</a>
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'score',
    dataIndex: 'score',
    key: 'score'
  }
]

class Authors extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      topAuthors: [],
      sortResults: "",
      limitResults: 100,
      genreResults: "",
    }

    this.updateSearchResults = this.updateSearchResults.bind(this)
    this.handleSortQueryChange = this.handleSortQueryChange.bind(this)
    this.handleLimitQueryChange = this.handleLimitQueryChange.bind(this)
    this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this)
  }

  handleSortQueryChange(event) {
      this.setState({ sortResults: event.target.value })
  }

  handleLimitQueryChange(event) {
      this.setState({ limitResults: event.target.value })
  }

  handleGenreQueryChange(event) {
      this.setState({ genreResults: event.target.value })
  }

  updateSearchResults() {
    getTopAuthors(this.state.sortResults, this.state.limitResults, this.state.genreResults).then(res => {
      this.setState({ topAuthors: res.result })
      console.log(res)
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <h3 style={{textAlign: "center"}}>Most Popular, Higest Rated, Most Controversial Authors</h3>
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
          <Col flex={2}>
            {/*<FormGroup style={{ width: '25vw', margin: '0 auto' }}>
              <label>Sort by</label>
              <FormInput placeholder="enter count, avg, or stddev" value={this.state.sortResults} onChange={this.handleSortQueryChange} />
            </FormGroup>*/}
            <p>choose an option</p>
            <label>
              <select onChange={this.handleSortQueryChange}>
                <option value="count">Most Popular</option>
                <option value="avg">Higest Rated</option>
                <option value="stddev">Most Controversial</option>
              </select>
            </label>
          </Col>
          <Col flex={2}>
            {/*<FormGroup style={{ width: '25vw', margin: '0 auto' }}>
              <label>Genre</label>
              <FormInput placeholder="Genre" value={this.state.genreResults} onChange={this.handleGenreQueryChange} />
          </FormGroup>*/}
            <label>
              <select onChange={this.handleGenreQueryChange}>
                <option value="fiction">Fiction</option>
                <option value="young-adult">Young Adult</option>
                <option value="history">History</option>
                <option value="historical fiction">Historical Fiction</option>
                <option value="biography">Biography</option>
                <option value="romance">Romance</option>
                <option value="children">Children</option>
                <option value="fantasy">Fantasy</option>
                <option value="paranormal">Paranormal</option>
                <option value="non-fiction">Nonfiction</option>
                <option value="comics">Comics</option>
                <option value="graphic">Graphic</option>
                <option value="mystery">Mystery</option>
                <option value="thriller">Thriller</option>
                <option value="crime">Crime</option>
                <option value="poetry">Poetry</option>
              </select>
            </label>
          </Col>
          <Col flex={2}>
            <FormGroup style={{ width: '10vw', margin: '25' }}>
              <label>Limit</label>
              <FormInput placeholder="Number of Results" value={this.state.limitResults} onChange={this.handleLimitQueryChange} />
            </FormGroup>
          </Col>
          <Col flex={2}><FormGroup style={{ width: '10vw' }}>
            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
          </FormGroup></Col>
        </Form> 
        <Table dataSource={this.state.topAuthors} columns={authorColumns} />
      </div>
    );
  }
}

export default Authors