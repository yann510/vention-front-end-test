import { SchemaBuilder } from "@serafin/schema-builder"
import { Flower } from "../schemas/flowerSchema"
import { Client } from "pg"

export const getSchemaProperties = <T>(schema: SchemaBuilder<T>, removeId: boolean) =>
    Object.keys(schema.schema.properties as {})
        .filter((x) => (removeId ? x !== "id" : true))
        .map((x) => `"${x}"`)
        .join(", ")

export const validateNoFlowerIdIsProvided = (flower: Flower) => {
    if (flower.id) {
        throw new Error("You cannot manually set the id")
    }
}

export const getSetUpdateString = (flower: Flower) => {
    return Object.keys(flower)
        .map((key, i) => `"${key}" = \$${i + 1}`)
        .join(", ")
}

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const sleep = async (fn: () => void, ms: number) => {
    await timeout(ms)
    return fn()
}

export const getPostgresClient = async () => {
    const client = new Client()
    await client.connect()

    return client
}
