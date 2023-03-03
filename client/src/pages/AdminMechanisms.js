import { useState, useEffect } from 'react'
import { fetchMechanisms, deleteMechanism } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateMechanism from '../components/CreateMechanism.js'
import UpdateMechanism from '../components/UpdateMechanism.js'

const AdminMechanisms = () => {
    const [mechanisms, setMechanisms] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [mechanism, setMechanism] = useState(null)

    const handleUpdateClick = (id) => {
        setMechanism(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteMechanism(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Тип механизма «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchMechanisms()
            .then(
                data => setMechanisms(data)
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
            <h1>Типы механизмов</h1>
            <Button onClick={() => setCreateShow(true)}>Создать тип механизмов</Button>
            <CreateMechanism show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateMechanism id={mechanism} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {mechanisms.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {mechanisms.map(item => 
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
                <p>Список типов механизмов пустой</p>
            )}
        </Container>
    )
}

export default AdminMechanisms