import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@hbagroup/instant-react/utils/component';

const styles = theme => ({
  root: {},
});

class __NaMe__ extends Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

__NaMe__.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles, { withRouter: true })(__NaMe__);
