import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class GuestLayout extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

GuestLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(GuestLayout)