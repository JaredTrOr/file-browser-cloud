import fs from 'node:fs/promises'
import path from 'node:path'
import { __storagepath } from '../middlewares/dirpaths.js'

export async function getFiles (req,res) {

    let files

    //Get all the file names
    try {
        files = await fs.readdir(__storagepath)
    } catch(err) {
        res.status(500).json({success: false, message: `${err}`})
    }

    //Get all the stats from the files to determine if the file is a normal file or a directory
    const filePromises = files.map(async file => {

        const filePath = path.join(__storagepath, file)
        let stats

        try {
            stats = await fs.stat(filePath)
        } catch(err) {
            res.status(500).json({success: false, message: `${err}`})
        }

        const fileObjectStat = {
            name: file,
            size: stats.size
        }

        if (stats.isDirectory()) return fileObjectStat

        return {
            ...fileObjectStat,
            extension: path.extname(file).replace('.', ''),
            fileModified: stats.mtime.toLocaleString()
        }
    })

    const fileObjects = await Promise.all(filePromises)

    res.json({success: true, files: fileObjects})
    
}