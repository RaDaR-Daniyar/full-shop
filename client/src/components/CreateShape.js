import { Modal, Button, Form } from 'react-bootstrap'
import { createShape } from '../http/catalogAPI.js'
import { useState } from 'react'

const CreateShape = (props) => {
    const { show, setShow, setChange } = props
    const [name, setName] = useState('')
    const [valid, setValid] = useState(null)
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
            createShape(data)
                .then(
                    data => {
                        setName('')
                        setValid(null)
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
                <Modal.Title>Новая форма корпуса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Название формы корпуса..."
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateShape