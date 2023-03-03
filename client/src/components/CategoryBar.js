import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'

const CategoryBar = observer(() => {
    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === catalog.category) {
            catalog.category = null
        } else {
            catalog.category = id
        }
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.brand) params.brand = catalog.brand
        if (catalog.mechanism) params.mechanism = catalog.mechanism
        if (catalog.gender) params.gender = catalog.gender
        if (catalog.shape) params.shape = catalog.shape
        if (catalog.material) params.material = catalog.material
        if (catalog.glass) params.glass = catalog.glass

        if (catalog.page > 1) params.page = catalog.page
        navigate({
            pathname: '/',
            search: '?' + createSearchParams(params),
        })
    }

    return (
        <ListGroup className='mt-3'>
            {catalog.categories.map(item =>
                <ListGroup.Item
                    key={item.id}
                    active={item.id === catalog.category}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CategoryBar