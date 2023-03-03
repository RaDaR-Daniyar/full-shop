import { useState, useEffect } from 'react'
import { fetchGlasss, deleteGlass } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateGlass from '../components/CreateGlass.js'
import UpdateGlass from '../components/UpdateGlass.js'

const AdminGlasss = () => {
    const [glasss, setGlasss] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [glass, setGlass] = useState(null)

    const handleUpdateClick = (id) => {
        setGlass(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteGlass(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Тип стекла «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchGlasss()
            .then(
                data => setGlasss(data)
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
            <h1>Тип стекла</h1>
            <Button onClick={() => setCreateShow(true)}>Добавить тип стекла</Button>
            <CreateGlass show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateGlass id={glass} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {glasss.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {glasss.map(item => 
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
                <p>Список типов стекла пустой</p>
            )}
        </Container>
    )
}

export default AdminGlasss