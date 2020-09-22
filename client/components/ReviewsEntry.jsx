import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class ReviewsEntry extends React.Component {
  constructor(props) {
    super(props);
    const { review: { votes_up, votes_down } } = this.props;
    this.state = {
      votesUp: votes_up,
      votesDown: votes_down,
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    const { votesUp } = this.state;
    const { review: { reviewId } } = this.props;
    axios
      .post(`/reviews/${reviewId}/upVote`)
      .then(() => {
        // console.log(data.data);
        this.setState({
          votesUp: votesUp + 1,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  downVote() {
    const { votesDown } = this.state;
    const { review: { reviewId } } = this.props;
    axios
      .post(`/reviews/${reviewId}/downVote`)
      .then(() => {
        this.setState({
          votesDown: votesDown + 1,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {
      votesUp,
      votesDown,
    } = this.state;
    const {
      review: {
        firstName,
        lastName,
        reviewTime,
        reviewTitle,
        reviewText,
        rating,
        bottomLine,
        place,
        skinType,
        skinShade,
        ageRange,
      },
    } = this.props;
    return (
      <article className="review-article">
        <section>
          <div className="review-user-info">
            <p className="review-display-name">
              {firstName}
              {' '}
              {lastName.slice(0, 1)}
              .
            </p>
            <time>{reviewTime}</time>
            <p className="review-display-location">{place}</p>
            <ul className="review-user">
              <li>
                <b>Skin Type</b>
                {' '}
                {skinType}
              </li>
              <li>
                <b>Skin Shade</b>
                {' '}
                {skinShade}
              </li>
              <li>
                <b>Age Range</b>
                {' '}
                {ageRange}
              </li>
            </ul>
          </div>
        </section>
        <section className="review-content">
          <div className="review-text-container">
            <div className="review-content-header">
              <StarRatings
                rating={rating}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="1px"
                starRatedColor="#000000"
                starEmptyColor="#ffffff"
                svgIconPath="M 14.5 1.5 c -0.7 0 -1.4 0.5 -1.6 1.2 l -2 6 H 4.5 c -0.8 0 -1.4 0.5 -1.6 1.2 s 0 1.5 0.6 1.9 l 5.2 3.8 l -2 6 c -0.2 0.7 0 1.5 0.6 1.9 c 0.3 0.2 0.7 0.3 1 0.3 c 0.4 0 0.7 -0.1 1 -0.3 l 5.2 -3.8 l 5.1 3.7 c 0.3 0.2 0.7 0.3 1 0.3 c 0.4 0 0.7 -0.1 1 -0.3 c 0.6 -0.4 0.9 -1.2 0.6 -2 l -2 -6 l 5.1 -3.7 c 0.5 -0.3 0.8 -0.8 0.8 -1.4 c 0 -1 -0.8 -1.7 -1.7 -1.7 h -6.3 l -1.9 -6 c -0.3 -0.6 -0.9 -1.1 -1.7 -1.1 Z"
                svgIconViewBox="0 0 28.5 26"
              />
              <h3 className="review-title">{reviewTitle}</h3>
            </div>
            <p className="review-body">{reviewText}</p>
          </div>
          <footer>
            <p className="review-bottom-line">
              <b>Bottom Line</b>
              {bottomLine}
            </p>
            <p className="review-footer-container">
              <span className="review-footer-text">Was this review helpful to you?</span>
              <button type="button" aria-label="Click to give this review a helpful vote" className="button--transparent" onClick={this.upVote}>
                <div direction="top" className="up-arrow">
                  <svg aria-hidden="false" width="14px" height="14px" viewBox="0 0 18 17">
                    <path d="M8.199 3.247L1.603 9.842.53 8.77l8.5-8.5.198.2 8.041 8.04-1.133 1.133-6.335-6.335V16.5H8.199z" />
                  </svg>
                </div>
              </button>
              <span size="5" className="helpful">{votesUp}</span>
              <button type="button" aria-label="Click to give this review a not helpful vote" className="button--transparent" onClick={this.downVote}>
                <div direction="bottom" className="down-arrow">
                  <svg aria-hidden="false" width="14px" height="14px" viewBox="0 0 18 17">
                    <path d="M8.199 3.247L1.603 9.842.53 8.77l8.5-8.5.198.2 8.041 8.04-1.133 1.133-6.335-6.335V16.5H8.199z" />
                  </svg>
                </div>
              </button>
              <span size="5" className="helpful">{votesDown}</span>
            </p>
          </footer>

        </section>
      </article>
    );
  }
}

ReviewsEntry.propTypes = {
  review: PropTypes.shape({
    reviewId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    reviewTime: PropTypes.string,
    reviewTitle: PropTypes.string,
    reviewText: PropTypes.string,
    rating: PropTypes.number,
    bottomLine: PropTypes.string,
    place: PropTypes.string,
    skinType: PropTypes.string,
    skinShade: PropTypes.string,
    ageRange: PropTypes.string,
    votes_up: PropTypes.number,
    votes_down: PropTypes.number,
  }).isRequired,
};

export default ReviewsEntry;
