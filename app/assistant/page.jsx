/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // This is a client component
import { useState, useEffect } from "react";
import { Form, Table, Container, Row, Col, Nav, Tab, Spinner, InputGroup, FloatingLabel, Button } from "react-bootstrap"
import AssistantSelect from "@/components/assitant/AssistantSelect";
import UploadFile from "@/components/assitant/UploadFile";
import CreateAssistant from "@/components/assitant/CreateAssistant";


export default function Page() {
  const [assitatnsList, setAssitantsList] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [filesList, setfilesList] = useState([])
  const [file, setFile] = useState()
  const [newAssistant, setNewAssistant] = useState({ name: '', instructions: '', fileId: '' })




  return <Container fluid>
    <Row>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} md={2}>
            <Nav variant="pills" className="flex-column tab-assistant" >
              <Nav.Item>
                <Nav.Link eventKey="first">Assistant Selected </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Upload File</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="threed">Create Assistant</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">

                <AssistantSelect
                  setfilesList={setfilesList}
                  filesList={filesList}
                  setSelectedAssistant={setSelectedAssistant}
                  selectedAssistant={selectedAssistant}
                  assitatnsList={assitatnsList}
                  setAssitantsList={setAssitantsList} />


              </Tab.Pane>
              <Tab.Pane eventKey="second">

                <UploadFile file={file} setFile={setFile} />


              </Tab.Pane>
              <Tab.Pane eventKey="threed">


                <CreateAssistant
                  filesList={filesList}
                  setNewAssistant={setNewAssistant}
                  newAssistant={newAssistant}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Row>

  </Container>;
}
