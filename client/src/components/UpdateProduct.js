import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { fetchOneProduct, updateProduct, fetchCategories, fetchBrands, fetchMechanisms, fetchGenders,  fetchShapes, fetchMaterials, fetchGlasss } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import UpdateProperties from './UpdateProperties.js'
import { createProperty, updateProperty, deleteProperty } from '../http/catalogAPI.js'

const defaultValue = {name: '', price: '', category: '', brand: '',  mechanism: '', gender: '', shape: '', material: '', glass: ''}
const defaultValid = {name: null, price: null, category: null, brand: null,  mechanism: null, gender: null, shape: null, material: null, glass: null}

const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
        if (key === 'price') result.price = pattern.test(value.price.trim())
        if (key === 'category') result.category = pattern.test(value.category)
        if (key === 'brand') result.brand = pattern.test(value.brand)
        if (key === 'mechanism') result.mechanism = pattern.test(value.mechanism)
        if (key === 'gender') result.gender = pattern.test(value.gender)
        if (key === 'shape') result.shape = pattern.test(value.shape)
        if (key === 'material') result.material = pattern.test(value.material)
        if (key === 'glass') result.glass = pattern.test(value.glass)

    }
    return result
}

const updateProperties = async (properties, productId) => {
    for (const prop of properties) {
        const empty = prop.name.trim() === '' || prop.value.trim() === ''
        if (empty && prop.id) {
            try {
                await deleteProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }

        if (prop.append && !empty) {
            try {
                await createProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.change && !prop.remove) {
            try {
                await updateProperty(productId, prop.id, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.remove) {
            try {
                await deleteProperty(productId, prop.id)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
    }
}

const UpdateProduct = (props) => {
    const { id, show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)
    const [mechanisms, setMechanisms] = useState(null)
    const [genders, setGenders] = useState(null)
    const [shapes, setShapes] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [glasss, setGlasss] = useState(null)
    const [straps, setStraps] = useState(null)
    const [waters, setWaters] = useState(null)
    const [image, setImage] = useState(null)
    const [properties, setProperties] = useState([])

    useEffect(() => {
        if(id) {
            fetchOneProduct(id)
                .then(
                    data => {
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString(),
                            mechanism: data.mechanismId.toString(),
                            gender: data.genderId.toString(),
                            shape: data.shapeId.toString(),
                            material: data.materialId.toString(),
                            glass: data.glassId.toString(),
                            strap: data.strapId.toString(),
                            water: data.waterId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        setProperties(data.props.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
            fetchCategories()
                .then(
                    data => setCategories(data)
                )
            fetchBrands()
                .then(
                    data => setBrands(data)
                )
            fetchMechanisms()
                .then(
                    data => setMechanisms(data)
                )
            fetchGenders()
                .then(
                    data => setGenders(data)
                )
            fetchShapes()
                .then(
                    data => setShapes(data)
                )
            fetchMaterials()
                .then(
                    data => setMaterials(data)
                )
            fetchGlasss()
                .then(
                    data => setGlasss(data)
                )

        }
    }, [id])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const correct = isValid(value)
        setValid(correct)

        if (correct.name && correct.price && correct.category && correct.brand && correct.mechanism && correct.gender && correct.shape && correct.material && correct.glass && correct.strap && correct.water) {
            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('price', value.price.trim())
            data.append('categoryId', value.category)
            data.append('brandId', value.brand)
            data.append('mechanismId', value.mechanism)
            data.append('genderId', value.gender)
            data.append('shapeId', value.shape)
            data.append('materialId', value.material)
            data.append('glassId', value.glass)
            data.append('strapId', value.strap)
            data.append('waterId', value.water)
            if (image) data.append('image', image, image.name)

            if (properties.length) {
                await updateProperties(properties, id)
            }

            updateProduct(id, data)
                .then(
                    data => {
                        event.target.image.value = ''
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString(),
                            mechanism: data.mechanismId.toString(),
                            gender: data.genderId.toString(),
                            shape: data.shapeId.toString(),
                            material: data.materialId.toString(),
                            glass: data.glassId.toString(),
                            strap: data.strapId.toString(),
                            water: data.waterId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        setProperties(data.props.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                        setShow(false)
                        setChange(state => !state)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>???????????????????????????? ????????????</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="???????????????? ????????????..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="category"
                                value={value.category}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.category === true}
                                isInvalid={valid.category === false}
                            >
                                <option value="">??????????????????</option>
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="brand"
                                value={value.brand}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.brand === true}
                                isInvalid={valid.brand === false}
                            >
                                <option value="">??????????</option>
                                {brands && brands.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="mechanism"
                                value={value.mechanism}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.mechanism === true}
                                isInvalid={valid.mechanism === false}
                            >
                                <option value="">?????? ??????????????????</option>
                                {mechanisms && mechanisms.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="gender"
                                value={value.gender}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.gender === true}
                                isInvalid={valid.gender === false}
                            >
                                <option value="">??????</option>
                                {genders && genders.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="shape"
                                value={value.shape}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.shape === true}
                                isInvalid={valid.shape === false}
                            >
                                <option value="">?????????? ??????????????</option>
                                {shapes && shapes.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="material"
                                value={value.material}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.material === true}
                                isInvalid={valid.material === false}
                            >
                                <option value="">???????????????? ??????????????</option>
                                {materials && materials.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="glass"
                                value={value.glass}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.glass === true}
                                isInvalid={valid.glass === false}
                            >
                                <option value="">????????????</option>
                                {glasss && glasss.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="strap"
                                value={value.strap}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.strap === true}
                                isInvalid={valid.strap === false}
                            >
                                <option value="">???????????????? ????????????????/??????????????</option>
                                {straps && straps.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="water"
                                value={value.water}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.water === true}
                                isInvalid={valid.water === false}
                            >
                                <option value="">??????????????????????????????????????</option>
                                {waters && waters.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="price"
                                value={value.price}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.price === true}
                                isInvalid={valid.price === false}
                                placeholder="???????? ????????????..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="???????? ????????????..."
                            />
                        </Col>
                    </Row>
                    <UpdateProperties properties={properties} setProperties={setProperties} />
                    <Row>
                        <Col>
                            <Button type="submit">??????????????????</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateProduct