/* eslint-disable no-undef */
const { Car } = require('../models/car')
const CarController = require('./CarController')

describe('CarController', () => {
  describe('#handleListCars', () => {
    it('should return a list of cars', async () => {
      const carController = new CarController({
        carModel: {
          findAll: jest.fn().mockReturnValue(Promise.resolve([])),
          count: jest.fn().mockReturnValue(Promise.resolve(0))
        },
        userCarModel: {},
        dayjs: {}
      })

      const req = {
        query: {
          page: 1,
          pageSize: 10
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await carController.handleListCars(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('#handleGetCar', () => {
    it('should return a car', async () => {
      const carController = new CarController({
        carModel: {
          findByPk: jest.fn().mockReturnValue(Promise.resolve({}))
        },
        userCarModel: {},
        dayjs: {}
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

      await carController.handleGetCar(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('#handleCreateCar', () => {
    it('should create a car', async () => {
      const carController = new CarController({
        carModel: {
          create: jest.fn().mockReturnValue(Promise.resolve({}))
        },
        userCarModel: {},
        dayjs: {}
      })

      const req = {
        body: {
          name: 'Car',
          price: 100,
          size: 'small',
          image: 'image'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await carController.handleCreateCar(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('#handleRentCar', () => {
    it('should rent a car', async () => {
      const carController = new CarController({
        carModel: {
          findOne: jest.fn().mockReturnValue(Promise.resolve({}))
        },
        userCarModel: {},
        dayjs: {}
      })

      const req = {
        params: {
          id: 1
        },
        body: {
          rentStartedAt: '2020-01-01',
          rentEndedAt: '2020-01-01'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await carController.handleRentCar(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('#handleUpdateCar', () => {
    it('should update a car', async () => {
      const carController = new CarController({
        carModel: {
          update: jest.fn().mockReturnValue(Promise.resolve({}))
        },
        userCarModel: {},
        dayjs: {}
      })

      const req = {
        params: {
          id: 20
        },
        body: {
          name: 'Car',
          price: 100,
          size: 'small',
          image: 'image'
        }
      }

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      }

      await carController.handleUpdateCar(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('#handleDeleteCar', () => {
    it('should delete a car', async () => {
      const carController = new CarController({
        carModel: {
          destroy: jest.fn().mockReturnValue(Promise.resolve({}))
        },
        userCarModel: {},
        dayjs: {}
      })

      const req = {
        params: {
          id: 20
        }
      }

      const res = {
        status: jest.fn().mockReturnThis()
      }

      await carController.handleDeleteCar(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
