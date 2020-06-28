import "./LoadEnv" // Must be the first import
import logger from "./shared/Logger"
import app from "./Server"

// Start the server
const port = Number(process.env.PORT || 8080)
app.listen(port, () => {
    logger.info("Express server started on port: " + port)
})
