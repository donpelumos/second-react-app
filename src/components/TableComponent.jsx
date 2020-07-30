import React, { Component } from "react";
import _ from "lodash";
import { paginate, filterList } from "../utils/paginate";

class TableComponent extends Component {
  state = {
    pageCount: 5,
    itemsPerPage: 6,
    currentPage: 1,
    paginatedItems: [],
    allItems: [],
    genres: [],
    currentGenre: 0,
  };

  constructor() {
    super();
    this.state.allItems = this.getList();
    this.state.genres = this.getGenres();
    this.state.pageCount = Math.ceil(
      this.state.allItems.length / this.state.itemsPerPage
    );
    let itemsToShow = paginate(
      this.state.allItems,
      this.state.itemsPerPage,
      this.state.currentPage
    );
    this.state.paginatedItems = itemsToShow;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <div className="list-group">
              {this.state.genres.map((genre) => (
                <a
                  key={genre.value}
                  href="#"
                  onClick={() => {
                    this.onGenreSelected(genre);
                  }}
                  className={
                    this.state.currentGenre == genre.value
                      ? "list-group-item list-group-item-action active"
                      : "list-group-item list-group-item-action"
                  }
                >
                  {genre.name}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-9">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {this.state.currentPage > 1 && (
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                )}
                {_.range(1, this.state.pageCount + 1).map((value) => (
                  <li
                    key={value}
                    className={
                      value == this.state.currentPage
                        ? "page-item active"
                        : "page-item"
                    }
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => this.onPaginationClicked(value)}
                    >
                      {value}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Movie Name</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {_.range(0, this.state.paginatedItems.length).map((index) => {
                  let movie = this.state.paginatedItems[index];
                  return (
                    <tr key={movie.title}>
                      <th>{index + 1}</th>
                      <td>{movie.title}</td>
                      <td>{movie.genre}</td>
                      <td>{movie.quantity}</td>
                      <td>{movie.price}</td>
                      <td>
                        <button type="button" className="btn btn-danger">
                          Danger
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  getList = () => {
    let movies = [
      { title: "Movie 1", genre: "Action", quantity: 7, price: 4.6 },
      { title: "Movie 2", genre: "Thriller", quantity: 8, price: 4.6 },
      { title: "Movie 3", genre: "Comedy", quantity: 4, price: 4.6 },
      { title: "Movie 4", genre: "Action", quantity: 5, price: 4.6 },
      { title: "Movie 5", genre: "Comedy", quantity: 66, price: 4.6 },
      { title: "Movie 6", genre: "Action", quantity: 3, price: 4.6 },
      { title: "Movie 7", genre: "Comedy", quantity: 7, price: 4.6 },
      { title: "Movie 8", genre: "Action", quantity: 87, price: 4.6 },
      { title: "Movie 9", genre: "Action", quantity: 23, price: 4.6 },
      { title: "Movie 10", genre: "Comedy", quantity: 456, price: 4.6 },
      { title: "Movie 11", genre: "Action", quantity: 34, price: 4.6 },
      { title: "Movie 12", genre: "Thriller", quantity: 45, price: 4.6 },
      { title: "Movie 13", genre: "Action", quantity: 2, price: 4.6 },
      { title: "Movie 14", genre: "Thriller", quantity: 56, price: 4.6 },
      { title: "Movie 15", genre: "Action", quantity: 6, price: 4.6 },
      { title: "Movie 16", genre: "Action", quantity: 24, price: 4.6 },
      { title: "Movie 17", genre: "Comedy", quantity: 98, price: 4.6 },
      { title: "Movie 18", genre: "Action", quantity: 45, price: 4.6 },
      { title: "Movie 19", genre: "Thriller", quantity: 23, price: 4.6 },
      { title: "Movie 20", genre: "Action", quantity: 12, price: 4.6 },
      { title: "Movie 21", genre: "Comedy", quantity: 17, price: 4.6 },
    ];
    return movies;
  };

  getGenres = () => {
    let genres = [
      { name: "All", value: 0 },
      { name: "Action", value: 1 },
      { name: "Comedy", value: 2 },
      { name: "Thriller", value: 3 },
    ];
    return genres;
  };

  onGenreSelected = ({ name, value }) => {
    console.log(name + "--" + value);
    let filteredList =
      value == 0 ? this.getList() : filterList(this.getList(), name);
    this.setState({ currentGenre: value });
    this.setState({ allItems: filteredList });
    this.paginateItems(filteredList, 1);
    this.setState({
      pageCount: Math.ceil(filteredList.length / this.state.itemsPerPage),
    });
  };

  onPaginationClicked = (index) => {
    console.log("current page - " + index);
    this.paginateItems(this.state.allItems, index);
  };

  paginateItems = (items, index) => {
    let itemsToShow = paginate(items, this.state.itemsPerPage, index);
    this.setState({ currentPage: index });
    this.setState({ paginatedItems: itemsToShow });
  };
}

export default TableComponent;
