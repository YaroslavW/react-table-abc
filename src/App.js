import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import _ from 'lodash';


class App extends Component {
  state ={
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc',  // 'desc'
    sortField: 'id',
    row: null,
    currentPage: 0,
  }
  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
   
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

  }
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField })
  }

  modeSelectHandler = url => {
    // console.log(url)
    this.setState({
      isModeSelected: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  
  onRowSelect = row => (
    this.setState({row})
  )

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  render() {
    const pageSize = 50;
    if(!this.state.isModeSelected){
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
    const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <Table 
        data={displayData}
        onSort={this.onSort}
        sort={this.state.sort}
        sortField={this.state.sortField}
        onRowSelect={this.onRowSelect}
        />
      }

      {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      /> : null
      }

      {
        this.state.row ? <DetailRowView person={this.state.row} /> : null
      }
      </div>
    );
  }
}

export default App;
