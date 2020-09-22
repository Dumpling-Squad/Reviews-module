import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import ReviewsCounter from './ReviewsCounter.jsx';
import ReviewsSearch from './ReviewsSearch.jsx';
import ReviewsList from './ReviewsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      avgRating: 0,
      totalReviews: 0,
      reviews: [],
      searchPerformed: false,
      searchResults: [],
      currentPageOfReviews: [],
      activePage: 1,
    };
    this.setAppState = this.setAppState.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.setSearchPerformed = this.setSearchPerformed.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.calculateAvgRating = this.calculateAvgRating.bind(this);
    this.scrollToReviewsList = this.scrollToReviewsList.bind(this);
    this.getProductId = this.getProductId.bind(this);
  }

  componentDidMount() {
    this.getProductId();
  }

  setAppState(property, data) {
    this.setState({
      [property]: data,
    });
  }

  setSearchPerformed() {
    const { searchPerformed } = this.state;
    if (searchPerformed === false) {
      this.setState({
        searchPerformed: true,
      });
    }
  }

  // This sends a request to the proxy server
  getProductId() {
    axios
      .get('/productId')
      .then((data) => {
        this.setState({
          productId: data.data.productId,
        });
      })
      .then(() => {
        this.getReviews();
      });
  }

  getReviews() {
    const { productId } = this.state;
    axios
      .get(`/reviews/${productId}`)
      .then((data) => {
        this.setState({
          reviews: data.data,
          currentPageOfReviews: data.data.slice(0, 10),
          activePage: 1,
        });
      })
      .then(() => {
        this.calculateTotalReviews();
        this.calculateAvgRating();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clearFilters() {
    this.setState({
      searchPerformed: false,
    });
  }

  calculateTotalReviews() {
    const { reviews } = this.state;
    this.setState({
      totalReviews: reviews.length,
    });
  }

  calculateAvgRating() {
    const { reviews } = this.state;
    const reducer = (accumulator, currentValue) => accumulator + currentValue.rating;
    // Iterate over each review & extract rating value, add together, then divide by totalReviews.
    const total = reviews.reduce(reducer, 0);
    // console.log(total);
    const avgRating = (total / reviews.length).toPrecision(2);
    // console.log(avgRating);
    this.setState({
      avgRating: parseFloat(avgRating),
    });
  }

  scrollToReviewsList() {
    const position = $('#scrollTop').offset();
    $('html, body').animate({ scrollTop: (position.top - 130) }, 1000);
  }

  render() {
    const {
      totalReviews,
      avgRating,
      productId,
      reviews,
      searchResults,
      searchPerformed,
      currentPageOfReviews,
      activePage,
    } = this.state;
    return (
      <div>
        <div className="reviews-wrapper">
          <ReviewsCounter
            totalReviews={totalReviews}
            avgRating={avgRating}
          />
          <ReviewsSearch
            productId={productId}
            reviews={reviews}
            setAppState={this.setAppState}
            setSearchPerformed={this.setSearchPerformed}
            calculateTotalReviews={this.calculateTotalReviews}
            calculateAvgRating={this.calculateAvgRating}
          />
          <ReviewsList
            reviews={reviews}
            searchResults={searchResults}
            searchPerformed={searchPerformed}
            currentPageOfReviews={currentPageOfReviews}
            activePage={activePage}
            setAppState={this.setAppState}
            scrollToReviewsList={this.scrollToReviewsList}
          />
        </div>
      </div>
    );
  }
}
export default App;
