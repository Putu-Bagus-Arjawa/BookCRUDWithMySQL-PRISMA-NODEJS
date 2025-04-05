import express from "express"
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";

const app = express();
const PORTS = process.env.PORTS || 3000
app.use(express.json());

app.use('/api/books',bookRoutes);
app.use('/api/authors', authorRoutes);

app.listen(PORTS, ()=>console.log(`Server menyala di port ${PORTS}`));