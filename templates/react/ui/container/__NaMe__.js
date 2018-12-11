import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageHeading from 'components/PageHeading';
import { decorate } from '@hbagroup/instant-react/utils/component';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
});

class __NaMe__ extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <PageHeading title="__NaMe__" />
        <div className={classes.root} />
      </Fragment>
    );
  }
}

__NaMe__.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default decorate(styles, { withRouter: true })(__NaMe__);
