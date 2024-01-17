/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useCreateMessageMutation } from "@/redux/Slices/MessageSlice"

export default function MessagePrompt(props) {

  const {threadId} = props;

  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    const maxHeight = 200; // Set your maximum height here
    e.target.style.height = Math.min(e.target.scrollHeight, maxHeight) + 'px';
  };


  const [createMessage, { data: response, isSuccess, isError, isLoading, error }] = useCreateMessageMutation()


  const handleCreateNewMessage = (e) => {
    e.preventDefault()
    if (text && threadId) {
      let newData = new FormData()
      newData.append('threadId',threadId)
      newData.append('content',text)

      console.log(newData)
      createMessage(newData)
    }

  }

  useEffect(() => {
    if (response && isSuccess) {
      console.log(response)
    }

  }, [response])



  return (
    <div className="message-prompt">

      <textarea name=""
        onChange={handleChange}
        onInput={autoResize}
        className='text-prompt' placeholder='MessagePrompt'></textarea>
      <BsFillArrowUpSquareFill className='send-btn' onClick={e => handleCreateNewMessage(e)} />

    </div>
  )
}

