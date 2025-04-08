import { app } from "@/app"
import { env } from "./env"

const porta = env.PORT

app.listen({
    host: '0.0.0.0',  
    port: porta
})
.then(() => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
}) 