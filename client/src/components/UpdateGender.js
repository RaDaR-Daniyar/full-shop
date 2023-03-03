import { Modal, Button, Form } from 'react-bootstrap'
import { fetchGender, updateGender } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'

const UpdateGender = (props) => {
    const { id, show, setShow, setChange } = props
    const [name, setName] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchGender(id)
                .then(
                    data => setName(data.name)
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim()
            }
            updateGender(id, data)
                .then(
                    data => {
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
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить пол</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Пол..."
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateGender