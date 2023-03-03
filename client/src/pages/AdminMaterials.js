import { useState, useEffect } from 'react'
import { fetchMaterials, deleteMaterial } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateMaterial from '../components/CreateMaterial.js'
import UpdateMaterial from '../components/UpdateMaterial.js'

const AdminMaterials = () => {
    const [materials, setMaterials] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    const [change, setChange] = useState(false)
    const [material, setMaterial] = useState(null)

    const handleUpdateClick = (id) => {
        setMaterial(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteMaterial(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Материал корпуса «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchMaterials()
            .then(
                data => setMaterials(data)
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
            <h1>Материалы корпуса</h1>
            <Button onClick={() => setCreateShow(true)}>Создать материал корпуса</Button>
            <CreateMaterial show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateMaterial id={material} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {materials.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(item => 
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
                <p>Список материалов корпуса пустой</p>
            )}
        </Container>
    )
}

export default AdminMaterials