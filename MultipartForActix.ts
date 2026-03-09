import type { AxiosInstance } from "axios";

function calcBounary (): string {
    let randomConstand = ""
    for (let i=0; i<3; i++) randomConstand += Math.random().toString(36).substring(2)
    return "-".repeat(24) + randomConstand
}

async function buildBody (metadata: {title: string, description: string}, file: File, boundary: string) {
    const chunks = [];
    const encoder = new TextEncoder();

    //Metadaten
    chunks.push(encoder.encode(`--${boundary}\r\n`))
    chunks.push(encoder.encode(`Content-Disposition: form-data; name="metadata"\r\n`))
    chunks.push(encoder.encode(`Content-Type: application/json\r\n\r\n`))
    chunks.push(encoder.encode(JSON.stringify(metadata)))
    chunks.push(encoder.encode(`\r\n`))

    //Datei
    chunks.push(encoder.encode(`--${boundary}\r\n`))
    chunks.push(encoder.encode(`Content-Disposition: form-data; name="file"; filename="${file.name}"\r\n`))
    chunks.push(encoder.encode(`Content-Type: ${file.type}\r\n\r\n`))
    
    //Binarys
    const fileBuffer = await file.arrayBuffer()
    chunks.push(new Uint8Array(fileBuffer))
    chunks.push(encoder.encode(`\r\n`))

    //Abschluss
    chunks.push(encoder.encode(`--${boundary}--\r\n`))

    return new Blob(chunks)
}

export async function FetchMultipartToActix (metadata: {title: string, description: string, }, file: File, api: AxiosInstance) {
    const boundary = calcBounary()
    const body = await buildBody(metadata, file, boundary)
    
    api.post(
        '/api/createPost',
        body,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            }
        }
    )
}