import React from "react"
import { Flower } from "../../api/src/schemas/flowerSchema"
import "./FlowerCard.css"
import Button from "./Button"

interface Props {
    flower: Flower
    toggleInCart: (flower: Flower) => void
}

function FlowerCard(props: Props) {
    const { flower, toggleInCart } = props

    const [isHovering, setIsHovering] = React.useState(false)

    return (
        <div className="card" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="media-container">
                <img alt="Flower" src={flower.imageBase64} className="media" />
            </div>
            <div className="separator-line" />
            <span className="title">{flower.name}</span>
            <span>{flower.price.toFixed(2)}$</span>
            <div>
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <img key={i} alt={"Star"} className={`star-image ${flower.rating >= i + 1 ? "" : "empty-star"}`} src={`${process.env.PUBLIC_URL}star.svg`} />
                    ))}
            </div>
            {isHovering && (
                <>
                    <div className="backdrop" />
                    <Button type="button" className="add-cart-button" onClick={() => toggleInCart(flower)}>
                        {flower.inCart ? "Remove from cart" : "Add to cart"}
                    </Button>
                </>
            )}
            {flower.inCart && <div className="in-cart-chip">In Cart</div>}
        </div>
    )
}

export default FlowerCard
