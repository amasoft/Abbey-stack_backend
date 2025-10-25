import app from "./app";
import { checkDatabaseConnection } from "./config/Connection";
const PORT =4000
app.listen(PORT,async()=>{
  await  checkDatabaseConnection()
    console.log(`Server Running on http://localhost:${PORT}`)
    
})