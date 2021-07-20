// Testing Middleware
import {UnauthorizedError} from 'express-jwt'
import {buildReq, buildRes, buildNext} from 'utils/generate'
import errorMiddleware from '../error-middleware'

///////////// extra credit 2 solution /////////////

// 🐨 Write a test for the UnauthorizedError case
test('responds with 401 for express-jwt UnauthorizedError', () => {
  const error = new UnauthorizedError('some_error_code', {
    message: 'Some message',
  })
  const req = buildReq()
  const res = buildRes()
  const next = buildNext()

  errorMiddleware(error, req, res, next)
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(next).not.toHaveBeenCalled()
})

// 🐨 Write a test for the headersSent case
test('calls next when response is already sent', () => {
  const error = new Error('some_error_code', {
    message: 'Some message',
  })
  const req = buildReq()
  const res = buildRes({headersSent: true})
  const next = buildNext()

  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('responds with 500 for unknown error', () => {
  const error = new Error('some_error_code', {
    message: 'Some message',
  })
  const req = buildReq()
  const res = buildRes()
  const next = buildNext()

  errorMiddleware(error, req, res, next)
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(next).not.toHaveBeenCalled()
})

///////////// extra credit 1 solution /////////////

// function buildRes(overrides) {
//   return {json: jest.fn(), status: jest.fn(), ...overrides}
// }

// // 🐨 Write a test for the UnauthorizedError case
// test('responds with 401 for express-jwt UnauthorizedError', () => {
//   const error = new UnauthorizedError('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = buildRes()
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(res.status).toHaveBeenCalledWith(401)
//   expect(res.status).toHaveBeenCalledTimes(1)
//   expect(res.json).toHaveBeenCalledWith({
//     code: error.code,
//     message: error.message,
//   })
//   expect(res.json).toHaveBeenCalledTimes(1)
//   expect(next).not.toHaveBeenCalled()
// })

// // 🐨 Write a test for the headersSent case
// test('calls next when response is already sent', () => {
//   const error = new Error('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = buildRes({headersSent: true})
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(next).toHaveBeenCalledWith(error)
//   expect(next).toHaveBeenCalledTimes(1)
//   expect(res.status).not.toHaveBeenCalled()
//   expect(res.json).not.toHaveBeenCalled()
// })

// // 🐨 Write a test for the else case (responds with a 500)
// test('responds with 500 for unknown error', () => {
//   const error = new Error('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = buildRes()
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(res.status).toHaveBeenCalledWith(500)
//   expect(res.status).toHaveBeenCalledTimes(1)
//   expect(res.json).toHaveBeenCalledWith({
//     message: error.message,
//     stack: error.stack,
//   })
//   expect(res.json).toHaveBeenCalledTimes(1)
//   expect(next).not.toHaveBeenCalled()
// })

///////////// exercise 1 solution /////////////

// 🐨 Write a test for the UnauthorizedError case
// test('responds with 401 for express-jwt UnauthorizedError', () => {
//   const error = new UnauthorizedError('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(res.status).toHaveBeenCalledWith(401)
//   expect(res.status).toHaveBeenCalledTimes(1)
//   expect(res.json).toHaveBeenCalledWith({
//     code: error.code,
//     message: error.message,
//   })
//   expect(res.json).toHaveBeenCalledTimes(1)
//   expect(next).not.toHaveBeenCalled()
// })

// 🐨 Write a test for the headersSent case
// test('calls next when response is already sent', () => {
//   const error = new Error('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = {
//     json: jest.fn(() => res),
//     status: jest.fn(() => res),
//     headersSent: true,
//   }
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(next).toHaveBeenCalledWith(error)
//   expect(next).toHaveBeenCalledTimes(1)
//   expect(res.status).not.toHaveBeenCalled()
//   expect(res.json).not.toHaveBeenCalled()
// })

// 🐨 Write a test for the else case (responds with a 500)
// test('responds with 500 for unknown error', () => {
//   const error = new Error('some_error_code', {
//     message: 'Some message',
//   })
//   const req = {}
//   const res = {
//     json: jest.fn(() => res),
//     status: jest.fn(() => res),
//   }
//   const next = jest.fn()

//   errorMiddleware(error, req, res, next)
//   expect(res.status).toHaveBeenCalledWith(500)
//   expect(res.status).toHaveBeenCalledTimes(1)
//   expect(res.json).toHaveBeenCalledWith({
//     message: error.message,
//     stack: error.stack,
//   })
//   expect(res.json).toHaveBeenCalledTimes(1)
//   expect(next).not.toHaveBeenCalled()
// })
