import React from 'react';
import PropTypes from 'prop-types';
import HighlightsEntry from './HighlightsEntry.jsx';

class HighlightsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordionOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { accordionOpen } = this.state;
    this.setState({
      accordionOpen: !accordionOpen,
    });
  }

  render() {
    const { accordionOpen } = this.state;
    const { totalReviews, highlights, scrollToReviewsList } = this.props;
    if (!accordionOpen) {
      return (
        <div className="highlights-wrapper">
          <div className="highlights--header" onClick={this.handleClick}>
            <h3>
              {totalReviews}
              {' '}
              Reviews
            </h3>
            <button type="button">-</button>
          </div>
          <div id="reviews-accordion">
            <h3>Review Highlights</h3>
            <ul>
              {highlights.map((review) => (
                <HighlightsEntry
                  key={review.id}
                  review={review}
                />
              ))}
            </ul>
            <button type="button" display="flex" width="100%" className="readAll" onClick={scrollToReviewsList}>
              <div>
                <span>Read All Reviews</span>
                <span display="inline-block" size="1">↓</span>
              </div>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="highlights-wrapper">
        <div className="highlights--header" onClick={this.handleClick}>
          <h3>
            {totalReviews}
            {' '}
            Reviews
          </h3>
          <button type="button">+</button>
        </div>
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

HighlightsList.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  highlights: PropTypes.arrayOf(reviewPropType).isRequired,
  scrollToReviewsList: PropTypes.func.isRequired,
};

export default HighlightsList;
