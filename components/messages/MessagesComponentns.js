/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Spinner } from "react-bootstrap";
import Chat from "../shard/Chat";
import MessagePrompt from "../shard/MessagePrompt";
import { useLazyGetMessageQuery } from "@/redux/Slices/MessageSlice";
import { useRunAssistantMutation } from "@/redux/Slices/AssistanSlice";
import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";

export default function MessagesComponentns(props) {
  let { threadId, assistantId } = props;

  const [messagesList, setMesssagesList] = useState([]);

  const [
    getMessages,
    { data: response, isSuccess, isLoading, isError, error },
  ] = useLazyGetMessageQuery();


  
  useEffect(() => {
    if (threadId) getMessages(threadId);
  }, [threadId]);

  useEffect(() => {
    if (isSuccess) setMesssagesList(response);
  }, [response]);



  //threads
  const [
    runThread,
    {
      data: runResponse,
      isLoading: runIsLoading,
      isSuccess: runIsSuccess,
      isError: runIsError,
      error: runError,
    },
  ] = useRunAssistantMutation();

  const handleRunThread = (e) => {
    e.preventDefault();

    if (threadId && assistantId) {
      let runData = new FormData();
      runData.append("threadId", threadId);
      runData.append("assistantId", assistantId);
      runData.append("instructions", "Please be veru accutre on responses ");

      runThread(runData);
    }
  };

  useEffect(() => {
    if (runResponse) {
      console.log(runResponse);
    }
  }, []);

  return (
    <Col md={10} className="chat-box">
      <button className="btn btn-run" onClick={(e) => handleRunThread(e)}>
        {runIsLoading ? <Spinner /> : <FiPlay className="ico" title="run" />}
      </button>
      <Chat messages={messagesList} />
      <MessagePrompt setMesssagesList={setMesssagesList} threadId={threadId} />
    </Col>
  );
}
