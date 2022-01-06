export default function (schema) {
  return async function (req, res) {
    if (schema) {
      res.json(schema)
    } else {
      res.status(500).json({
        error: true,
        msg: 'Error loading schema'
      })
    }
  }
}
