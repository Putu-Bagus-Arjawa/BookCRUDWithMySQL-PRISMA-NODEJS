import express from "express"
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import cors from "cors"

const app = express();
app.use(cors({
    origin: 'http://localhost:5173' // Port default Vite
  }));
const PORTS = process.env.PORTS || 3000
app.use(express.json());

app.use('/api/books',bookRoutes);
app.use('/api/authors', authorRoutes);

app.listen(PORTS, ()=>console.log(`Server menyala di port ${PORTS}`));