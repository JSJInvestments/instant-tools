/**
 * @template react/ui/component
 * Container template
 *
 * @author Craig Myles
 * @version 1.0.1
 * Last updated Wed 12 Dec
 *
 * Instructions:
 *
 * 1. Modify the code as neccessary.
 *
 * 2. Delete these instructions from your file.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { decorate } from '@hbagroup/instant-react/utils/component';
import PageHeading from '@hbagroup/instant-react/components/PageHeading';

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
