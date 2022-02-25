
import filter from './filter'
import sort from './sort'
import pagination from './pagination'
import aggregations from './aggregations'

export const MiddlewareProcessor = function (...middlewares) {
  // https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/
  const stack = middlewares
  const push = (...middlewares) => {
    stack.push(...middlewares)
  }
  const execute = async (context) => {
    let prevIndex = -1
    const runner = async (index) => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times')
      }
      prevIndex = index
      const middleware = stack[index]
      if (middleware) {
        await middleware(context, () => {
          return runner(index + 1)
        })
      }
    }
    await runner(0)
  }
  return { push, execute }
}

export const getResultsFromMiddleware = (middlewares, initialData) => {
  let data = {}
  if (!middlewares || middlewares.length === 0) {
    throw new Error('no middleware defined')
  }
  const pipeline = MiddlewareProcessor()
  middlewares.forEach(middleware => {
    pipeline.push(middleware)
  })
  pipeline.push((ctx) => {
    data = ctx
  })
  pipeline.execute(initialData)
  return data
}

export { filter }
export { sort }
export { pagination }
export { aggregations }

export default MiddlewareProcessor
