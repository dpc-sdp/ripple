export default {
  handleError: (error, res) => {
    if (error && error.hasOwnProperty('status')) {
      res.status(error.status).json({
        error: {
          status: error.status,
          message: error.statusText
        }
      })
    } else if (error.hasOwnProperty('response')) {
      res.status(error.response.status).json({
        error: {
          status: error.response.status,
          message: error.message
        }
      })
    } else {
      res.status(500).json({
        error: {
          status: 500,
          message: 'Error fetching data',
          debug: error
        }
      })
    }
  }
}
