// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'description',
    message: "Summary of package"
  },
  {
    type: 'input',
    name: 'version',
    message: "version",
    initial: '1.0.0'
  }
]
