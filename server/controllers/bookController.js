import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createBook = async(req, res)=>{
    const {judul, authorEmail} = req.body;

    if (!judul || !authorEmail){
        return res.status(400).json({message: "Isi dulu bre judul dan authorEmail nya!"})
    }
    try {

        const checkAuthornya = await prisma.author.findUnique({
            where:{email: authorEmail}
        })

        if (!checkAuthornya){
            return res.status(404).json({message: `Author dengan email ${authorEmail} tidak ada`})
        }

        const checkBookExist = await prisma.book.findFirst({
            where:{
                authorEmail:authorEmail,
                judul: judul,
            }
        })
        if(checkBookExist){
            return res.status(400).json({message: "buku dah ada bre😑"})
        }

        const book = await prisma.book.create({
            data:{
                judul, 
                authorEmail}
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

        if (books.length === 0){
            return res.status(404).json({message: "Maaf sayang, data yang kau cari ga ada 😭"})
        }
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
    try {
        const {id} = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "ID buku invalid!" });
        }
        const {judul, authorEmail} = req.body;
        if (!judul || !authorEmail) {
            return res.status(400).json({ error: "Judul & email wajib diisi!" });
        }
        const updatedBook = await prisma.book.update({
            where: { id: parseInt(id) },
            data: { judul, authorEmail }
        });
      
        res.status(200).json(updatedBook)

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