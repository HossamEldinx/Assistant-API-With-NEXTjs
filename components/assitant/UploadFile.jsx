/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Form, Table, Container, Row, Col, Nav, Tab, Spinner, InputGroup, FloatingLabel, Button } from "react-bootstrap"
import { useUploadPdfMutation } from "@/redux/Slices/DataSlice"
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadFile(props) {

    let { setFile, file } = props;


    //file logic 
    function handleOnChangeFile(e) {
        const target = e.target.files[0]
        setFile(target);
    }

    //upload file to open ai 
    const [uploadFile, { data: fileResponse,
        isSuccess: fileIsSuccess,
        isError: fileIsError,
        isLoading: fileIsLoading,
        error: fileError }] = useUploadPdfMutation()

    //handle upload the file to open ai
    const handleFileUpload = (e) => {
        e.preventDefault()

        if (file) {
            let fileData = new FormData()
            fileData.append('file', file)

            uploadFile(fileData)
        }

    }

    //logic need for saving the files 
    useEffect(() => {
        if (fileIsSuccess) {

            let files = []

            let getFileList = localStorage.getItem('files')

            if (getFileList) {
                files = JSON.parse(getFileList)
            }

            // Concatenate the new files with the existing ones
            let newFilesList = files.concat(fileResponse)

            // Remove null values
            newFilesList = newFilesList.filter(file => file !== null);

            // Remove duplicates based on the 'id' property
            newFilesList = newFilesList.reduce((uniqueFiles, file) => {
                const existingFile = uniqueFiles.find(f => f.id === file.id);
                if (!existingFile) {
                    uniqueFiles.push(file);
                }
                return uniqueFiles;
            }, []);


            localStorage.setItem('files', JSON.stringify(newFilesList))
        }

    }, [fileResponse])





    return (

        <form onSubmit={handleFileUpload} className='upload-file'>
            {fileIsLoading && <Spinner />}
            {!fileIsLoading && <div className='form-upload'>

                <div className='uploading-box'>
                    <p className='upload-text'>Upload File (PDF/CSV)</p>
                    <input
                        className='upload-file-input'
                        id="file"
                        type="file"
                        name="file"
                        onChange={handleOnChangeFile}
                    />
                </div>


                <button type="submit" className='upload-btn'> 
                <FaCloudUploadAlt />
                </button>

            </div>}

        </form>
    )
}
