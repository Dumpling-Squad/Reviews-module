import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';
import HighlightsList from './HighlightsList.jsx';

class ReviewHighlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 0,
      highlights: [],
    };
    this.getHighlights = this.getHighlights.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.scrollToReviewsList = this.scrollToReviewsList.bind(this);
  }

  componentDidMount() {
    this.getHighlights();
  }

  getHighlights() {
    const { productId } = this.props;
    axios
      .get(`/reviews/${productId}/sort/5`)
      .then((data) => {
        this.setState({
          highlights: data.data,
        });
      })
      .then(() => {
        this.calculateTotalReviews();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  calculateTotalReviews() {
    this.setState((state) => ({
      totalReviews: state.highlights.length,
    }));
  }

  scrollToReviewsList() {
    const position = $('#scrollTop').offset();
    $('html, body').animate({ scrollTop: (position.top - 130) }, 1000);
  }

  render() {
    const { totalReviews, highlights } = this.state;
    return (
      <HighlightsList
        totalReviews={totalReviews}
        highlights={highlights.slice(0, 3)}
        scrollToReviewsList={this.scrollToReviewsList}
      />
    );
  }
}

ReviewHighlights.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ReviewHighlights;
