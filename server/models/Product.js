import { Product as ProductMapping } from './mapping.js'
import { ProductProp as ProductPropMapping } from './mapping.js'
import { Brand as BrandMapping } from './mapping.js'
import { Mechanism as MechanismMapping } from './mapping.js'
import { Gender as GenderMapping } from './mapping.js'
import { Shape as ShapeMapping } from './mapping.js'
import { Material as MaterialMapping } from './mapping.js'
import { Glass as GlassMapping } from './mapping.js'

import { Category as CategoryMapping } from './mapping.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class Product {
    async getAll(options) {
        const {categoryId, brandId, mechanismId, genderId, shapeId, materialId, glassId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        if (categoryId) where.categoryId = categoryId
        if (brandId) where.brandId = brandId
        if (mechanismId) where.mechanismId = mechanismId
        if (genderId) where.genderId = genderId
        if (shapeId) where.shapeId = shapeId
        if (materialId) where.materialId = materialId
        if (glassId) where.glassId = glassId

        const products = await ProductMapping.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                {model: BrandMapping, as: 'brand'},
                {model: MechanismMapping, as: 'mechanism'},
                {model: GenderMapping, as: 'gender'},
                {model: ShapeMapping, as: 'shape'},
                {model: MaterialMapping, as: 'material'},
                {model: GlassMapping, as: 'glass'},

                {model: CategoryMapping, as: 'category'}
            ],
            order: [
                ['name', 'ASC'],
            ],
        })
        return products
    }
    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {model: ProductPropMapping, as: 'props'},
                {model: BrandMapping, as: 'brand'},
                {model: MechanismMapping, as: 'mechanism'},
                {model: GenderMapping, as: 'gender'},
                {model: ShapeMapping, as: 'shape'},
                {model: MaterialMapping, as: 'material'},
                {model: GlassMapping, as: 'glass'},

                {model: CategoryMapping, as: 'category'},
            ]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }
    async create(data, img) {
        const image = FileService.save(img) ?? ''
        const {name, price, categoryId = null, brandId = null, mechanismId = null, genderId = null, shapeId = null, materialId = null, glassId = null} = data
        const product = await ProductMapping.create({name, price, image, categoryId, brandId, mechanismId, genderId, shapeId, materialId, glassId})
        if (data.props) {
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        const created = await ProductMapping.findByPk(product.id, {
            include: [{model: ProductPropMapping, as: 'props'}]
        })
        return created
    }
    async update(id, data, img) {
        const product = await ProductMapping.findByPk(id, {
            include: [{model: ProductPropMapping, as: 'props'}]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const file = FileService.save(img)
        if (file && product.image) {
            FileService.delete(product.image)
        }
        const {
            name = product.name,
            price = product.price,
            categoryId = product.categoryId,
            brandId = product.brandId,
            mechanismId = product.mechanismId,
            genderId = product.genderId,
            shapeId = product.shapeId,
            materialId = product.materialId,
            glassId = product.glassId,

            image = file ? file : product.image
        } = data
        await product.update({name, price, categoryId, image, brandId, mechanismId, genderId, shapeId, materialId, glassId})
        if (data.props) {
            await ProductPropMapping.destroy({where: {productId: id}})
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await ProductPropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    productId: product.id
                })
            }
        }
        await product.reload()
        return product
    }
    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        if (product.image) {
            FileService.delete(product.image)
        }
        await product.destroy()
        return product
    }

    async isExist(id) {
        const basket = await ProductMapping.findByPk(id)
        return basket
    }
}

export default new Product()