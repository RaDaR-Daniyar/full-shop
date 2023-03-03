import MechanismModel from '../models/Mechanism.js'
import AppError from '../errors/AppError.js'

class Mechanism {
    async getAll(req, res, next) {
        try {
            const mechanisms = await MechanismModel.getAll()
            res.json(mechanisms)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа механизма')
            }
            const mechanism = await MechanismModel.getOne(req.params.id)
            res.json(mechanism)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия типа механизма')
            }
            const mechanism = await MechanismModel.create(req.body)
            res.json(mechanism)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа механизма')
            }
            if (!req.body.name) {
                throw new Error('Нет названия типа механизма')
            }
            const mechanism = await MechanismModel.update(req.params.id, req.body)
            res.json(mechanism)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа механизма')
            }
            const mechanism = await MechanismModel.delete(req.params.id)
            res.json(mechanism)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Mechanism()