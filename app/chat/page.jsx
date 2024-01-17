/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import SideBar from '@/components/shard/Sidebar';
import { useLazyGetAllAssitantsQuery } from "@/redux/Slices/AssistanSlice"
import MessagesComponentns from '@/components/messages/MessagesComponentns';

const ChatPage = () => {

    const [assitatnsList, setAssitantsList] = useState([])
    const [selectedAssistant, setSelectedAssistant] = useState('')
    const [selectedThread, setSelectedThread] = useState('')

    const [getALL, {
        data: response,
        isSuccess,
        isLoading,
        isError,
        error }] = useLazyGetAllAssitantsQuery()


    //get all assistant and set the assistant from the stroage 
    useEffect(() => {
        getALL()

        let getCurrentAssistnt = localStorage.getItem('assistant')
        if (getCurrentAssistnt) {
            getCurrentAssistnt = JSON.parse(getCurrentAssistnt)
            setSelectedAssistant(getCurrentAssistnt.id)
        }
    }, [])


    useEffect(() => {
        if (isSuccess) setAssitantsList(response.assistants)

    }, [response])





    return (
        <Container fluid>
            <Row>
                <Col md={2} className="bg-dark text-light min-vh-100 sidebar">

                    <SideBar
                        assistants={assitatnsList}
                        selectedAssistant={selectedAssistant}
                        setSelectedAssistant={setSelectedAssistant}
                        selectedThread={selectedThread}
                        setSelectedThread={setSelectedThread}
                    />

                </Col>


                <Col md={10} className="p-4 gpt-box">
                    <MessagesComponentns threadId={selectedThread} assistantId={selectedAssistant} />
                </Col>

            </Row>
        </Container>
    );
};

export default ChatPage;
