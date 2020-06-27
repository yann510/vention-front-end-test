import React from "react"
import "./CreateFlowerDialog.css"
import { useForm } from "react-hook-form"
import Button from "./Button"

interface Props {
    onClose: () => void
    onCreate: (data: any) => void
}

function CreateFlowerDialog(props: Props) {
    const { onClose, onCreate } = props

    const { register, handleSubmit, errors } = useForm()

    return (
        <>
            <div className="dialog-container">
                <div className="dialog-backdrop" onClick={onClose} />
                <div className="dialog-content">
                    <form onSubmit={handleSubmit(onCreate)}>
                        <div className="label-input-container">
                            <label>Name</label>
                            <input name="name" ref={register({ required: true })} />
                            {errors.name && <div className="error">Name is required.</div>}
                        </div>
                        <div className="label-input-container">
                            <label>Price</label>
                            <input name="price" type="number" min={0} step={0.01} ref={register({ required: true })} />
                            {errors.price && <div className="error">Price is required.</div>}
                        </div>
                        <div className="label-input-container">
                            <label>Rating</label>
                            <input name="rating" type="number" min={1} max={5} step={1} ref={register({ required: true })} />
                            {errors.rating && <div className="error">Rating is required.</div>}
                        </div>
                        <div className="label-input-container">
                            <label>Image</label>
                            <input name="imageBase64" type="file" accept="image/*" ref={register({ required: true })} />
                            {errors.imageBase64 && <div className="error">Image is required.</div>}
                        </div>
                        <Button type="submit">Create Flower</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateFlowerDialog
