import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { createProduct, fetchCategories, fetchBrands, fetchMechanisms, fetchGenders, fetchShapes, fetchMaterials, fetchGlasss } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'
import CreateProperties from './CreateProperties.js'

const defaultValue = {name: '', price: '', category: '', brand: '', mechanism: '', gender: '', shape: '', material: '', glass: ''}
const defaultValid = {name: null, price: null, category: null, brand: null, mechanism: null, gender: null, shape: null, material: null, glass: null}

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

const CreateProduct = (props) => {
    const { show, setShow, setChange } = props
    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)
    const [image, setImage] = useState(null)
    const [properties, setProperties] = useState([])
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)
    const [mechanisms, setMechanisms] = useState(null)
    const [genders, setGenders] = useState(null)
    const [shapes, setShapes] = useState(null)
    const [materials, setMaterials] = useState(null)
    const [glasss, setGlasss] = useState(null)

    useEffect(() => {
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

    }, [])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const correct = isValid(value)
        setValid(correct)

        if (correct.name && correct.price && correct.category && correct.brand && correct.mechanism && correct.gender && correct.shape && correct.material && correct.glass) {

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

            if (image) data.append('image', image, image.name)
            if (properties.length) {
                const props = properties.filter(
                    prop => prop.name.trim() !== '' && prop.value.trim() !== ''
                )
                if (props.length) {
                    data.append('props', JSON.stringify(props))
                }
            }

            createProduct(data)
                .then(
                    data => {
                        event.target.image.value = ''
                        setValue(defaultValue)
                        setValid(defaultValid)
                        setProperties([])
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
                <Modal.Title>Новый товар</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Название товара..."
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
                                <option value="">Категория</option>
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
                                <option value="">Бренд</option>
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
                                <option value="">Тип механизма</option>
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
                                <option value="">Пол</option>
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
                                <option value="">Форма корпуса</option>
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
                                <option value="">Материал корпуса</option>
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
                                <option value="">Стекло</option>
                                {glasss && glasss.map(item =>
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
                                placeholder="Цена товара..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Фото товара..."
                            />
                        </Col>
                    </Row>
                    <CreateProperties properties={properties} setProperties={setProperties} />
                    <Row>
                        <Col>
                            <Button type="submit">Сохранить</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateProduct