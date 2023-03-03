import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import BrandBar from '../components/BrandBar.js'
import MechanismBar from '../components/MechanismBar.js'
import GenderBar from '../components/GenderBar.js'
import ShapeBar from '../components/ShapeBar.js'
import MaterialBar from '../components/MaterialBar.js'
import GlassBar from '../components/GlassBar.js'

import ProductList from '../components/ProductList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchBrands, fetchMechanisms, fetchGenders, fetchShapes, fetchMaterials, fetchGlasss, fetchAllProducts } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'
import CarouselBox from '../components/CarouselBox';

const getSearchParams = (searchParams) => {
    let category = searchParams.get('category')
    if (category && /[1-9][0-9]*/.test(category)) {
        category = parseInt(category)
    }
    let brand = searchParams.get('brand')
    if (brand && /[1-9][0-9]*/.test(brand)) {
        brand = parseInt(brand)
    }
    let mechanism = searchParams.get('mechanism')
    if (mechanism && /[1-9][0-9]*/.test(mechanism)) {
        mechanism = parseInt(mechanism)
    }
    let gender = searchParams.get('gender')
    if (gender && /[1-9][0-9]*/.test(gender)) {
        gender = parseInt(gender)
    }
    let shape = searchParams.get('shape')
    if (shape && /[1-9][0-9]*/.test(shape)) {
        shape = parseInt(shape)
    }
    let material = searchParams.get('material')
    if (material && /[1-9][0-9]*/.test(material)) {
        material = parseInt(material)
    }
    let glass = searchParams.get('glass')
    if (glass && /[1-9][0-9]*/.test(glass)) {
        glass = parseInt(glass)
    }

    let page = searchParams.get('page')
    if (page && /[1-9][0-9]*/.test(page)) {
        page = parseInt(page)
    }
    return {category, brand, mechanism, gender, shape, material, glass, page}
}

const Shop = observer(() => {
    const { catalog } = useContext(AppContext)

    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [brandsFetching, setBrandsFetching] = useState(true)
    const [mechanismsFetching, setMechanismsFetching] = useState(true)
    const [gendersFetching, setGendersFetching] = useState(true)
    const [shapesFetching, setShapesFetching] = useState(true)
    const [materialsFetching, setMaterialsFetching] = useState(true)
    const [glasssFetching, setGlasssFetching] = useState(true)

    const [productsFetching, setProductsFetching] = useState(true)

    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchBrands()
            .then(data => catalog.brands = data)
            .finally(() => setBrandsFetching(false))

        fetchMechanisms()
            .then(data => catalog.mechanisms = data)
            .finally(() => setMechanismsFetching(false))

        fetchGenders()
            .then(data => catalog.genders = data)
            .finally(() => setGendersFetching(false))
        
        fetchShapes()
            .then(data => catalog.shapes = data)
            .finally(() => setShapesFetching(false))

        fetchMaterials()
            .then(data => catalog.materials = data)
            .finally(() => setMaterialsFetching(false))

        fetchGlasss()
            .then(data => catalog.glasss = data)
            .finally(() => setGlasssFetching(false))



        const {category, brand, mechanism, gender, shape, material, glass, page} = getSearchParams(searchParams)
        catalog.category = category
        catalog.brand = brand
        catalog.mechanism = mechanism
        catalog.gender = gender
        catalog.shape = shape
        catalog.material = material
        catalog.glass = glass

        catalog.page = page ?? 1

        fetchAllProducts(catalog.category, catalog.brand, catalog.mechanism, catalog.gender, catalog.shape, catalog.material, catalog.glass, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [])

    useEffect(() => {
        const {category, brand, mechanism, gender, shape, material, glass, page} = getSearchParams(searchParams)

        if (category || brand || mechanism || gender || shape || material || glass || page) {
            if (category !== catalog.category) {
                catalog.category = category
            }
            if (brand !== catalog.brand) {
                catalog.brand = brand
            }
            if (mechanism !== catalog.mechanism) {
                catalog.mechanism = mechanism
            }
            if (gender !== catalog.gender) {
                catalog.gender = gender
            }
            if (shape !== catalog.shape) {
                catalog.shape = shape
            }
            if (material !== catalog.material) {
                catalog.material = material
            }
            if (glass !== catalog.glass) {
                catalog.glass = glass
            }

            if (page !== catalog.page) {
                catalog.page = page ?? 1
            }
        } else  {
            catalog.category = null
            catalog.brand = null
            catalog.mechanism = null
            catalog.gender = null
            catalog.shape = null
            catalog.material = null
            catalog.glass = null

            catalog.page = 1
        }
    }, [location.search])

    useEffect(() => {
        setProductsFetching(true)
        fetchAllProducts(catalog.category, catalog.brand, catalog.mechanism, catalog.gender, catalog.shape, catalog.material, catalog.glass, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [catalog.category, catalog.brand, catalog.mechanism, catalog.gender, catalog.shape, catalog.material, catalog.glass, catalog.page])

    return (
        <Container>
            <CarouselBox />
            <Row className="mt-2">
                <Col md={3} className="mb-3">
                    <div>
                        {categoriesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <CategoryBar />
                        )}
                    </div>
                    <div>
                        {brandsFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <BrandBar />
                        )}
                    </div>
                    <div>
                        {mechanismsFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <MechanismBar />
                        )}
                    </div>
                    <div>
                        {gendersFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <GenderBar />
                        )}
                    </div>
                    <div>
                        {shapesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <ShapeBar />
                        )}
                    </div>
                    <div>
                        {materialsFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <MaterialBar />
                        )}
                    </div>
                    <div>
                        {glasssFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <GlassBar />
                        )}
                    </div>

                </Col>
                <Col md={9}>
                    <div>
                        {productsFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <ProductList />
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop;