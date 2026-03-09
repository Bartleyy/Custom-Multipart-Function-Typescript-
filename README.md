# Custom-Multipart-Function-Typescript-
A custom function to set headers of multipart manually because of problems in old actix versions

# Description
This sets headers with boundary of multipart manually. It is specified for one of my own objects which requires a fileUpload with metadata but can be easily adjusted to other projects aswell

# Requirements
- Typescript
- Axios

# How it works as blackbox
The exported function takes metadata and a File, aswell as an AxiosInstance. The metadata and the File will get converted to the body in correct multipart form with a unique boundary and then get posted via the AxiosInstance. You can easily delete the input of AxiosInstance and do it without the library by replacing the post function with a regularly fetch. Just keep in mind that you might need to add a session cookie to the header since in my case I specified the AxiosInstance with the withCredentials flag, so it automatically uses the browsers HTTPOnly session coookie
