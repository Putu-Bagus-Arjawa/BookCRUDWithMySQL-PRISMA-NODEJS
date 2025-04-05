import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createBook = async(req, res)=>{
    const {judul, authorEmail} = req.body;

    try {
        const author = await prisma.author.findUnique({
            where: { email: authorEmail }
        });

        if (!author) {
            return res.status(400).json({ error: 'Author tidak ditemukan' });
        }

        const book = await prisma.book.create({
            data:{judul,authorEmail}
        })

        res.status(201).json(book)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getBooks = async (req, res)=>{
    try {
        const books = await prisma.book.findMany({
            include:{
                author: true
            }
        })
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getBookById = async (req, res)=>{
    const {id} = req.params;
    try {
        const book = await prisma.book.findUnique({
            where:{id:parseInt(id)},
            include:{
                author:true
            }
        })
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateBook = async (req, res)=>{
    const {id} = req.params;
    const {judul, authorEmail} = req.body;

    try {

        const bookExist = await prisma.book.findUnique({
            where:{ id: parseInt(id)}
        })

        if(!bookExist){
            res.status(404).json({message: "book that you're looking not found"})
        }
        const updateBook = await prisma.book.update({
            where:{id: parseInt(id)},
            data:{
                judul: judul || bookExist.judul,
                authorEmail: authorEmail|| bookExist.authorEmail
            }
        })
        res.status(200).json(updateBook)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deleteBook = async (req, res)=>{
    const {id} = req.params;
    try {
        const  book = await prisma.book.findUnique({
            where:{id: parseInt(id)}
        })
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
          }
          
          await prisma.book.delete({
            where: { id: parseInt(id) }
          });
        res.status(204).send()   
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}