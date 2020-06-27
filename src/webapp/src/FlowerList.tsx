import { Flower } from "../../api/src/schemas/flowerSchema"
import FlowerCard from "./FlowerCard"
import React from "react"
import "./FlowerList.css"

interface Props {
    flowers: Flower[]
    toggleInCart: (flower: Flower) => void
}

function FlowerList(props: Props) {
    const { flowers, toggleInCart } = props

    return (
        <div className="card-container">
            {flowers.map((flower: Flower) => (
                <FlowerCard key={flower.id} flower={flower} toggleInCart={toggleInCart} />
            ))}
        </div>
    )
}

export default FlowerList
