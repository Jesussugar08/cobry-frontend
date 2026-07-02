import axios from 'axios'

const uploadLogo = async (file: File) => {
    const sanitizedName = file.name.replace(/\s+/g, '-')
    
    const response = await axios.post('http://localhost:3000/api/upload', {
        fileName: sanitizedName,
        fileType: file.type
    })

    const {url} = response.data

    await axios.put(url, file,{
        headers:{
            'Content-Type': file.type
        }
    })


    const cloudFrontUrl = `https://d2z852mysxxlc5.cloudfront.net/${sanitizedName}`
    return cloudFrontUrl

}


export { uploadLogo }

