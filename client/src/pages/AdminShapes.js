import { useState, useEffect } from 'react'
import { fetchShapes, deleteShape } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateShape from '../components/CreateShape.js'
import UpdateShape from '../components/UpdateShape.js'

const AdminShapes = () => {
    const [shapes, setShapes] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [shape, setShape] = useState(null)

    const handleUpdateClick = (id) => {
        setShape(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteShape(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Форма корпуса «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchShapes()
            .then(
                data => setShapes(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Форма корпуса</h1>
            <Button onClick={() => setCreateShow(true)}>Создать форму корпуса</Button>
            <CreateShape show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateShape id={shape} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {shapes.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {shapes.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список бформ корпуса пустой</p>
            )}
        </Container>
    )
}

export default AdminShapes