import axios from 'axios'

const uploadLogo = async (file: File) => {

    const response = await axios.post('http://localhost:3000/api/upload', {
        fileName: file.name,
        fileType: file.type
    })

    const {url} = response.data

    await axios.put(url, file,{
        headers:{
            'Content-Type': file.type
        }
    })


    const cloudFrontUrl = `https://d2z852mysxxlc5.cloudfront.net/${file.name}`
    return cloudFrontUrl

}


export { uploadLogo }

