import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import ReviewsEntry from './ReviewsEntry.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    const {
      setAppState,
      searchPerformed,
      reviews,
      searchResults,
    } = this.props;
    // console.log(`active page is ${pageNumber}`);
    const offset = (pageNumber - 1) * 10;
    setAppState('activePage', pageNumber);
    setAppState('currentPageOfReviews', (!searchPerformed ? reviews.slice(offset, offset + 10) : searchResults.slice(offset, offset + 10)));
  }

  render() {
    const {
      currentPageOfReviews,
      activePage,
      scrollToReviewsList,
      searchPerformed,
      reviews,
      searchResults,
    } = this.props;
    return (
      <div className="review-list">
        {currentPageOfReviews.length
          ? (
            <aside>
              {currentPageOfReviews.map((review) => (
                <ReviewsEntry
                  key={review.id}
                  review={review}
                />
              ))}
              <p className="displaying-reviews-text">
                Displaying Reviews
                <b>
                  {' '}
                  {(activePage - 1) * 10 + 1}
                  {' '}
                  -
                  {' '}
                  {currentPageOfReviews.length >= 10
                    ? activePage * 10
                    : (activePage - 1) * 10 + currentPageOfReviews.length}
                </b>
              </p>
              <button type="button" className="reviews-scroll-to-top" onClick={scrollToReviewsList}>
                <b>Back to Top</b>
              </button>
            </aside>
          )
          : <h3 className="noResults">Sorry, no results were found</h3>}
        <Pagination
          hideDisabled
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={!searchPerformed ? reviews.length : searchResults.length}
          prevPageText="<< Previous"
          nextPageText="Next >>"
          hideFirstLastPages
          pageRangeDisplayed={1}
          onChange={this.handlePageChange}
        />
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

ReviewsList.defaultProps = {
  searchResults: null,
};

ReviewsList.propTypes = {
  setAppState: PropTypes.func.isRequired,
  currentPageOfReviews: PropTypes.arrayOf(reviewPropType).isRequired,
  activePage: PropTypes.number.isRequired,
  scrollToReviewsList: PropTypes.func.isRequired,
  searchPerformed: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(reviewPropType).isRequired,
  searchResults: PropTypes.arrayOf(reviewPropType),
};

export default ReviewsList;
