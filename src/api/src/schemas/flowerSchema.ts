import { SchemaBuilder } from "@serafin/schema-builder"

export const flowerSchema = SchemaBuilder.emptySchema({})
    .addNumber("id", { description: "A unique id representing the flower" }, false)
    .addString("name", { description: "The name of the flower", minLength: 1 })
    .addNumber("price", { description: "The selling price of the flower", minimum: 0 })
    // I've added this property in the flower schema directly as we only have a single user for our usecase
    .addNumber("rating", { description: "The rating is from 1 to 5 representing the appreciation of the product", minimum: 1, maximum: 5 })
    .addString("imageBase64", { description: "Base64 representation of the flower image" })
    // I've added this property in the flower schema directly as we only have a single user for our usecase
    .addBoolean("inCart", { description: "Set to true if it is in the cart" }, false)

export type Flower = typeof flowerSchema.T
