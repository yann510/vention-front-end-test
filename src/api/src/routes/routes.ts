import { Request, Response, Router } from "express"
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status-codes"
import { Flower, flowerSchema } from "../schemas/flowerSchema"
import { SchemaBuilder } from "@serafin/schema-builder"
import { getPostgresClient, getSchemaProperties, getSetUpdateString, sleep, validateNoFlowerIdIsProvided } from "@shared/utils"
const { Client } = require("pg")

const router = Router()

/******************************************************************************
 *                             Get Flowers
 ******************************************************************************/
router.get("/flowers", async (req, res) => {
    const client = await getPostgresClient()

    const query = {
        text: `SELECT ${getSchemaProperties(flowerSchema, false)} FROM flowers ORDER BY id`,
    }
    const result = await client.query(query)

    res.status(OK)
    return res.json(result.rows)
})

/******************************************************************************
 *                             Create Flower
 ******************************************************************************/
router.post("/flowers", async (req, res) => {
    const flower: Flower = req.body

    flowerSchema.validate(flower)
    validateNoFlowerIdIsProvided(flower)

    const client = await getPostgresClient()

    const query = {
        text: `INSERT INTO flowers(${getSchemaProperties(flowerSchema, true)}) VALUES($1, $2, $3, $4, $5) RETURNING id`,
        values: [flower.name, flower.price, flower.rating, flower.imageBase64, flower.inCart],
    }

    const result = await client.query(query)

    res.status(CREATED)
    return res.json({ ...result.rows[0], ...flower })
})

/******************************************************************************
 *                             Patch Flower
 ******************************************************************************/
router.patch("/flowers/:id", async (req, res) => {
    const flower: Flower = req.body

    flowerSchema.toOptionals().validate(flower)
    validateNoFlowerIdIsProvided(flower)

    const client = await getPostgresClient()

    const readQuery = {
        text: `SELECT ${getSchemaProperties(flowerSchema, true)} FROM flowers WHERE id=${req.params.id}`,
    }
    const readResult = await client.query(readQuery)
    if (readResult.rows.length === 0) {
        res.status(NOT_FOUND)
        throw new Error("No flower found for the provided id")
    }

    const update = getSetUpdateString(flower)
    console.log(`UPDATE flowers SET ${update} WHERE id=${req.params.id} RETURNING *`, flower, req.body)
    const query = {
        text: `UPDATE flowers SET ${update} WHERE id=${req.params.id} RETURNING *`,
        values: Object.values(flower),
    }

    const result = await client.query(query)

    res.status(OK)
    return res.json(result.rows[0])
})

export default router
