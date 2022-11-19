/* eslint-disable no-unused-vars */
const AuthenticationController = require('./AuthenticationController')
const { User, Role } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { EmailNotRegisteredError } = require('../errors/EmailNotRegisteredError')

describe('AuthenticationController', () => {
  describe('#handleLogin', () => {
    it('should return a token', async () => {
      const email = 'user@gmail.com'
      const password = 'user123'
      const encryptedPassword = bcrypt.hashSync('user123', 10)

      const mockRequest = {
        body: {
          email,
          password
        }
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      const mockNext = jest.fn()

      const mockUser = {
        id: 1,
        name: 'user',
        email: 'user@gmail.com',
        encryptedPassword,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const mockRole = {
        id: 1,
        name: 'member'
      }

      const mockUserModel = {
        findOne: jest.fn().mockReturnValue({
          ...mockUser,
          Role: mockRole
        })
      }

      const mockRoleModel = {
        findOne: jest.fn().mockReturnValue(mockRole)
      }

      const authController = new AuthenticationController({
        userModel: mockUserModel,
        roleModel: mockRoleModel,
        bcrypt,
        jwt
      })
      await authController.handleLogin(mockRequest, mockResponse, mockNext)
      const token = authController.createTokenFromUser({
        ...mockUser,
        Role: mockRole
      }, mockRole)

      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: token
      })
    })

    it('should call res.status(404) and res.json with email not registered error',
      async () => {
        const email = 'user@gmail.com'
        const password = 'user123'

        const mockRequest = {
          body: {
            email,
            password
          }
        }

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        }

        const mockNext = jest.fn()

        const mockUserModel = {
          findOne: jest.fn().mockReturnValue(null)
        }

        const mockRole = {
          id: 1,
          name: 'member'
        }

        const mockRoleModel = {
          findOne: jest.fn().mockReturnValue(mockRole)
        }

        const authController = new AuthenticationController({
          userModel: mockUserModel,
          roleModel: mockRoleModel,
          bcrypt,
          jwt
        })
        await authController.handleLogin(mockRequest, mockResponse, mockNext)

        const err = new EmailNotRegisteredError(email)

        expect(mockUserModel.findOne).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith(err)
      }
    )
  })

  describe('#handleRegister', () => {
    it('should return a token', async () => {
      const user = {
        id: 1,
        email: '',
        password: ''
      }

      const authenticationController = new AuthenticationController({
        userModel: {
          findOne: jest.fn().mockReturnValue(Promise.resolve(user))
        },
        roleModel: {},
        bcrypt: {
          compare: jest.fn().mockReturnValue(Promise.resolve(true))
        },
        jwt: {
          sign: jest.fn().mockReturnValue('token')
        }
      })

      const req = {
        body: {
          email: 'email',
          password: 'password'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await authenticationController.handleRegister(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('#handleGetUser', () => {
    it('should return a user', async () => {
      const user = {
        id: 1,
        email: '',
        password: ''
      }

      const authenticationController = new AuthenticationController({
        userModel: {
          findOne: jest.fn().mockReturnValue(Promise.resolve(user))
        },
        roleModel: {},
        bcrypt: {
          compare: jest.fn().mockReturnValue(Promise.resolve(true))
        },
        jwt: {
          sign: jest.fn().mockReturnValue('token')
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await authenticationController.handleGetUser(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
