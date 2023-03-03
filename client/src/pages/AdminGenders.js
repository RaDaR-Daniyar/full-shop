import { useState, useEffect } from 'react'
import { fetchGenders, deleteGender } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateGender from '../components/CreateGender.js'
import UpdateGender from '../components/UpdateGender.js'

const AdminGenders = () => {
    const [genders, setGenders] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [gender, setGender] = useState(null)

    const handleUpdateClick = (id) => {
        setGender(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteGender(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Пол «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchGenders()
            .then(
                data => setGenders(data)
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
            <h1>Добавить пол</h1>
            <Button onClick={() => setCreateShow(true)}>Добавить пол</Button>
            <CreateGender show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateGender id={gender} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {genders.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {genders.map(item => 
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
                <p>Список пол пустой</p>
            )}
        </Container>
    )
}

export default AdminGenders