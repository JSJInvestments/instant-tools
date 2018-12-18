/**
 * @template react/ui/component
 * Component template
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
import { decorate } from 'instant-react-core/utils/component';

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
