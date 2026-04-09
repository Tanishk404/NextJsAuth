import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const CloudinaryConn = async (file:Blob) => {
    if(!file) return;
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({folder: 'nextjsAvatar'}, (error, result) => {
                if(error) reject(error)
                    resolve(result)
            }
        ).end(buffer)
        })

        return result


    } catch (error) {
        console.log(error)
    }   
} 