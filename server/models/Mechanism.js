import { Mechanism as MechanismMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Mechanism {
    async getAll() {
        const mechanisms = await MechanismMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return mechanisms
    }
    async getOne(id) {
        const mechanism = await MechanismMapping.findByPk(id)
        if (!mechanism) {
            throw new Error('Тип механизма не найден в БД')
        }
        return mechanism
    }
    async create(data) {
        const {name} = data
        const exist = await MechanismMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой тип механизма уже есть')
        }
        const mechanism = await MechanismMapping.create({name})
        return mechanism
    }
    async update(id, data) {
        const mechanism = await MechanismMapping.findByPk(id)
        if (!mechanism) {
            throw new Error('Тип механизма не найден в БД')
        }
        const {name = mechanism.name} = data
        await mechanism.update({name})
        return mechanism
    }
    async delete(id) {
        const mechanism = await MechanismMapping.findByPk(id)
        if (!mechanism) {
            throw new Error('Тип механизма не найден в БД')
        }
        await mechanism.destroy()
        return mechanism
    }
}

export default new Mechanism()