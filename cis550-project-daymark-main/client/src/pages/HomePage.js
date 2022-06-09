import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import { getFrontPageBooks } from '../fetcher'
import MenuBar from '../components/MenuBar';

const background={
  backgroundImage:
    "url('https://lh5.googleusercontent.com/O7WS9AdtQj6ScVO6SpWq34zMcV53PuXZhYmwdivRvC_dAirw9peyDeCKvM7G_rasYbYawRCtjBhT8U7dm2WUSmjdfGkMvl1Ts28RV55TG0p0oIha=w1280')",
  height:'100vh',
  marginTop:'-70px',
  fontSize:'50px',
  backgroundSize:'cover',
  backgroundRepeat:'no-repeat'
};

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      booksResults: []
    }
  }

  componentDidMount() {
    getFrontPageBooks().then(res => {
      console.log(res.result)
      this.setState({ booksResults: res.result })
    })
  }

  render() {

    return(
      <div>
        <MenuBar />
        <h1 style={{textAlign: "center"}}>Welcome to Daymark!</h1>
        <p>This web application that displays information from Goodreads on more than 2 million books, along with their 
        respective user/reader interactions. Core features include filtering books by names, genres, popularity (ratings count),
        and rating (average rating), as well as filtering authors by name, popularity (ratings count), and rating (average rating). 
        We will present information such as a book’s ISBN, author, publication date, page count, etc., as well as raw and aggregated 
        interaction data such as ratings, reviews, and book completion status/ratios.</p>
        <p>.</p>
        <div style={background} />
      </div>
    );
  }
}


export default HomePage