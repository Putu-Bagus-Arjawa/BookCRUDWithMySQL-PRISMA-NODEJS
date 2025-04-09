import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createAuthor = async (req, res) => {
    const { email, username } = req.body;
    
    try {
      const author = await prisma.author.create({
        data: { email, username }
      });
      res.status(201).json(author);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const getAuthors = async (req, res) => {
    try {
      const authors = await prisma.author.findMany({
        include: { books: true }
      });

      if(authors.length === 0){
        res.status(404).json({message: "Ga ada author manapun di sini, maaf ya kawan😫"})
      }
      res.status(200).json(authors);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };