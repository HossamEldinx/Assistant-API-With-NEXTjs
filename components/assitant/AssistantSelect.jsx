/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Form, Table, Container, Row, Col } from "react-bootstrap"
import { useLazyGetAllAssitantsQuery } from "@/redux/Slices/AssistanSlice";

export default function AssistantSelect(props) {
    let { setfilesList,
        filesList,
        setAssitantsList,
        assitatnsList,
        setSelectedAssistant,
        selectedAssistant } = props;


    const [getALL, { data: response, isSuccess, isLoading, isError, error ,isFetching, isUninitialized }] = useLazyGetAllAssitantsQuery();

    useEffect(() => {
        getALL();

        //get the assistant from the storage 
        let assistant = localStorage.getItem('assistant')
        if (assistant) {
            setSelectedAssistant(JSON.parse(assistant))
        }

        let files = localStorage.getItem('files')
        if (files) {
            setfilesList(JSON.parse(files))
        }
    }, []);


    //set assitants list 
    useEffect(() => {
        if (isSuccess) {
            setAssitantsList(response.assistants);
        }
    }, [response]);

    //switching assistnt 
    const handleChangeAssistant = (e) => {
        e.preventDefault()
        let value = e.target.value

        let assitantData = assitatnsList.find((assistant) => {
            return assistant.id === value
        })

        setSelectedAssistant(assitantData)



        //change assistant in the storage 
        localStorage.setItem('assistant', JSON.stringify(assitantData))
        console.log(assitantData)
    }



    return (
        <Col lg={5}>
            {assitatnsList && assitatnsList.length > 0 &&
                <Form.Select aria-label="Select Assistant"
                    className='form-select-assistant'
                    onChange={e => handleChangeAssistant(e)}>
                    <option>Open this menu to select Assistant</option>

                    {assitatnsList.map((el, i) => {
                        return <option key={i} value={el.id}>{el.name}</option>

                    })}

                </Form.Select>}
            {selectedAssistant && selectedAssistant.id && <Table striped variant="dark">
                <thead>
                    <tr>
                        <th>Tag</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Assistant Id</td>
                        <td>{selectedAssistant.id}</td>
                    </tr>
                    <tr>
                        <td>created_at</td>
                        <td>{selectedAssistant.created_at}</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>{selectedAssistant.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{selectedAssistant.description}</td>
                    </tr>
                    <tr>
                        <td>model</td>
                        <td>{selectedAssistant.model}</td>
                    </tr>

                    <tr>
                        <td>instructions</td>
                        <td>{selectedAssistant.instructions}</td>
                    </tr>
                    <tr>
                        <td>tools</td>
                        <td>{selectedAssistant.tools && selectedAssistant.tools.map((el) => el.type)}</td>
                    </tr>
                    <tr>
                        <td>file_ids</td>
                        <td>{selectedAssistant.file_ids && selectedAssistant?.file_ids.map((el) => el)}</td>
                    </tr>

                </tbody>
            </Table>}

        </Col>
    )
}
