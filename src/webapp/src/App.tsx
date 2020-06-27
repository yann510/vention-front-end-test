import React from "react"
import "./App.css"
import { config } from "./config"
import { Flower } from "../../api/src/schemas/flowerSchema"
import FlowerList from "./FlowerList"
import axios from "axios"
import Button from "./Button"
import CreateFlowerDialog from "./CreateFlowerDialog"

function App() {
    const [flowers, setFlowers] = React.useState<Flower[]>([])
    const [isCreateDialogOpened, setIsCreateDialogOpened] = React.useState(false)

    // Redux could of been used, but I wanted to keep this as simple as possible
    React.useEffect(() => {
        async function fetchFlowers() {
            const response = await axios.get(`${config.apiUrl}/flowers`)
            setFlowers(response.data)
        }
        fetchFlowers().then()
    }, [])

    const toggleInCart = async (flower: Flower) => {
        const response = await axios.patch(`${config.apiUrl}/flowers/${flower.id}`, { inCart: !flower.inCart })
        const updatedFlower = response.data

        setFlowers(flowers.map((x) => (x.id === updatedFlower.id ? updatedFlower : x)))
    }

    const onCreateFlower = async (data: any) => {
        const fileReader = new FileReader()

        fileReader.readAsDataURL(data.imageBase64[0])
        fileReader.onload = async function () {
            const response = await axios.post(`${config.apiUrl}/flowers`, {
                name: data.name,
                price: parseFloat(data.price),
                rating: parseInt(data.rating),
                imageBase64: fileReader.result,
            })

            setFlowers([...flowers, response.data])
            setIsCreateDialogOpened(false)
        }
        fileReader.onerror = function (error) {
            console.error("Error: ", error)
        }
    }

    return (
        <div className="app">
            <div className="app-bar">
                <div className="content-container app-bar-container">
                    <span>Flower Store</span>
                    <Button type="button" onClick={() => setIsCreateDialogOpened(true)}>
                        Create Flower
                    </Button>
                </div>
            </div>
            <div className="content-container">
                <FlowerList flowers={flowers} toggleInCart={toggleInCart} />
            </div>
            {isCreateDialogOpened && <CreateFlowerDialog onClose={() => setIsCreateDialogOpened(false)} onCreate={onCreateFlower} />}
        </div>
    )
}

export default App
