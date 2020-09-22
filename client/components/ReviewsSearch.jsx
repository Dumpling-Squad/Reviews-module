import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ReviewsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryStr: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.searchReviews = this.searchReviews.bind(this);
    this.searchByFilter = this.searchByFilter.bind(this);
  }

  handleChange(e) {
    this.setState({
      queryStr: e.target.value,
    });
  }

  clearFilters() {
    const { reviews, setAppState } = this.props;
    setAppState('searchPerformed', false);
    setAppState('currentPageOfReviews', reviews.slice(0, 10));
    document.getElementById('review-search').value = '';
    document.getElementById('reviews-sort').value = 'Default';
    document.getElementById('skinType').value = 'Default';
    document.getElementById('ageRange').value = 'Default';
    document.getElementById('skinShade').value = 'Default';
  }

  searchReviews() {
    const { productId, setAppState, setSearchPerformed } = this.props;
    const { queryStr } = this.state;
    axios
      .get(`/reviews/${productId}/${queryStr}`)
      .then((data) => {
        setAppState('searchResults', data.data);
        setSearchPerformed();
        setAppState('currentPageOfReviews', data.data.slice(0, 10));
        setAppState('activePage', 1);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  searchByFilter(e, filterType) {
    const { productId, setAppState, setSearchPerformed } = this.props;
    axios
      .get(`/reviews/${productId}/${filterType}/${e.target.value}`)
      .then((data) => {
        setAppState('searchResults', data.data);
        setSearchPerformed();
        setAppState('currentPageOfReviews', data.data.slice(0, 10));
        setAppState('activePage', 1);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="reviews-search-sort">
        <div className="reviews-search-input">
          <div className="input-container">
            <input type="search" id="review-search" className="input" placeholder="Search reviews…" name="search" onChange={this.handleChange} />
          </div>
          <button type="button" aria-label="Search" aria-expanded="false" className="reviews-search-button" onClick={this.searchReviews}>
            <svg aria-hidden="false" width="42px" height="18px" fill="white" viewBox="0 0 17 17" className="">
              <path d="M16.8 15.7L12 10.9c.9-1.2 1.5-2.6 1.5-4.2 0-3.7-3-6.7-6.7-6.7C3 0 0 3 0 6.7s3 6.7 6.7 6.7c1.6 0 3.1-.6 4.2-1.5l4.8 4.8c.1.1.3.2.5.2s.4-.1.5-.2c.4-.2.4-.7.1-1zM6.7 12c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2S12 3.8 12 6.7 9.6 12 6.7 12z" />
            </svg>
          </button>
        </div>
        <div className="reviews-filter">
          <select aria-label="Sort by" id="reviews-sort" className="select" defaultValue="Default" onChange={(e) => this.searchByFilter(e, 'sort')}>
            <option value="Default" disabled hidden>Sort by</option>
            <option value="1">Most Recent</option>
            <option value="2">Oldest</option>
            <option value="3">Lowest Rated</option>
            <option value="4">Highest Rated</option>
            <option value="5">Most Helpful</option>
            {/* <option value="6">Images</option> */}
          </select>
        </div>
        <span className="reviews-filter-container">
          <div className="reviews-filter">
            <select aria-label="Filter by Skin Type" className="select" id="skinType" defaultValue="Default" onChange={(e) => this.searchByFilter(e, 'skinType')}>
              <option value="Default" disabled hidden>Skin Type</option>
              <option value="Combination">Combination</option>
              <option value="Normal">Normal</option>
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
            </select>
          </div>
          <div className="reviews-filter">
            <select aria-label="Filter by Age Range" className="select" id="ageRange" defaultValue="Default" onChange={(e) => this.searchByFilter(e, 'ageRange')}>
              <option value="Default" disabled hidden>Age Range</option>
              <option value="17-24">17-24</option>
              <option value="25-30">25-30</option>
              <option value="31-40">31-40</option>
              <option value="41-50">41-50</option>
              <option value="51-60">51-60</option>
              <option value="60 &amp; Up">60 &amp; Up</option>
            </select>
          </div>
          <div className="reviews-filter">
            <select aria-label="Filter by Skin Shade" className="select" id="skinShade" defaultValue="Default" onChange={(e) => this.searchByFilter(e, 'skinShade')}>
              <option value="Default" disabled hidden>Skin Shade</option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Deep">Deep</option>
              <option value="Rich">Rich</option>
            </select>
          </div>
        </span>
        <button className="button--block  review-clear-filters" type="button" onClick={this.clearFilters}>Clear filters</button>
      </div>
    );
  }
}

const reviewPropType = PropTypes.shape({
  reviewId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  reviewTime: PropTypes.string.isRequired,
  reviewTitle: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  bottomLine: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  skinType: PropTypes.string.isRequired,
  skinShade: PropTypes.string.isRequired,
  ageRange: PropTypes.string.isRequired,
  votes_up: PropTypes.number.isRequired,
  votes_down: PropTypes.number.isRequired,
});

ReviewsSearch.propTypes = {
  productId: PropTypes.number.isRequired,
  setAppState: PropTypes.func.isRequired,
  setSearchPerformed: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(reviewPropType).isRequired,
};

export default ReviewsSearch;
