import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _categories = []
    _brands = []
    _mechanisms = []
    _genders = []
    _shapes = []
    _materials = []
    _glasss = []

    _products = []
    _category = null 
    _brand = null
    _mechanism = null
    _gender = null
    _shape = null
    _material = null
    _glass = null

    _page = 1
    _count = 0
    _limit = 8

    constructor() {
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }
    get brands() {
        return this._brands
    }
    get mechanisms() {
        return this._mechanisms
    }
    get genders() {
        return this._genders
    }
    get shapes() {
        return this._shapes
    }
    get materials() {
        return this._materials
    }
    get glasss() {
        return this._glasss
    }

    get products() {
        return this._products
    }
    get category() {
        return this._category
    }
    get brand() {
        return this._brand
    }
    get mechanism() {
        return this._mechanism
    }
    get gender() {
        return this._gender
    }
    get shape() {
        return this._shape
    }
    get material() {
        return this._material
    }
    get glass() {
        return this._glass
    }

    get page() {
        return this._page
    }
    get count() {
        return this._count
    }
    get limit() {
        return this._limit
    }
    get pages() {
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }
    set brands(brands) {
        this._brands = brands
    }
    set mechanisms(mechanisms) {
        this._mechanisms = mechanisms
    }
    set genders(genders) {
        this._genders = genders
    }
    set shapes(shapes) {
        this._shapes = shapes
    }
    set materials(materials) {
        this._materials = materials
    }
    set glasss(glasss) {
        this._glasss = glasss
    }

    set products(products) {
        this._products = products
    }
    set category(id) {
        this.page = 1
        this._category = id
    }
    set brand(id) {
        this.page = 1
        this._brand = id
    }
    set mechanism(id) {
        this.page = 1
        this._mechanism = id
    }
    set gender(id) {
        this.page = 1
        this._gender = id
    }
    set shape(id) {
        this.page = 1
        this._shape = id
    }
    set material(id) {
        this.page = 1
        this._material = id
    }
    set glass(id) {
        this.page = 1
        this._glass = id
    }

    set page(page) {
        this._page = page
    }
    set count(count) {
        this._count = count
    }
    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore