/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Form, InputGroup, FloatingLabel, Button } from "react-bootstrap"
import { useCreateAssistantMutation } from "@/redux/Slices/AssistanSlice";

export default function CreateAssistant(props) {
    let { filesList, setNewAssistant, newAssistant, setAssitantsList } = props;

    //create Assistant
    const [createAssistant, {
        data: assistantResponse,
        isSuccess: assistantIsSuccess,
        isError: assistantIsError,
        isLoading: assistantIsLoading,
        error: assistantError
    }] = useCreateAssistantMutation()



    // Function to update state based on key-value pair
    const updateAssistantState = (key, value) => {
        console.log(key, value)
        setNewAssistant(prevState => ({
            ...prevState,
            [key]: value
        }));
    };



    const handleSubmitAssistant = (e) => {
        e.preventDefault()
        if (!newAssistant.name || !newAssistant.instructions) {
            return;
        }

        let assistantData = new FormData()
        assistantData.append('name', newAssistant.name)
        assistantData.append('instructions', newAssistant.instructions)
        if (newAssistant.fileId) assistantData.append('fileId', newAssistant.fileId)

        createAssistant(assistantData)

    }

    useEffect(() => {
        if (assistantIsSuccess) {
            console.log(assistantResponse)
            let getAllassistant = localStorage.getItem('assitant')
            getAllassistant = JSON.parse(getAllassistant)
            let newAssistans = [...getAllassistant, assistantResponse]
            localStorage.setItem('assistant', JSON.stringify(newAssistans))


            setAssitantsList(newAssistans)
        }
    }, [assistantResponse])


    return (


        <div>

            <form onSubmit={handleSubmitAssistant}>
                <InputGroup className="mb-3">
                    <Form.Control
                        className='assistant-input'
                        onChange={e => updateAssistantState('name', e.target.value)}
                        name="name"
                        placeholder="Assistant Name"
                        aria-label="Assistant Name"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <FloatingLabel controlId="floatingTextarea2" label="instructions" variant="dark">
                    <Form.Control
                        className='assistant-input'

                        onChange={e => updateAssistantState('instructions', e.target.value)}

                        name="instructions"
                        as="textarea"
                        placeholder="Assistant instructions"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>

                {filesList && <Form.Select className='form-select-assistant'
                    onChange={e => updateAssistantState('fileId', e.target.value)} >
                    <option>Select File</option>
                    {filesList.map((el, i) => {
                        return <option key={i} value={el.id}>{el.filename}</option>

                    })}

                </Form.Select>}


                <Button variant="success" type="submit">Create</Button>
            </form>
        </div>
    )
}
