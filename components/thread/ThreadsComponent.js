/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // This is a client component
import React, { useState, useEffect } from "react";
import {
  useCreateThreadMutation,
  useLazyGetThreadQuery,
} from "@/redux/Slices/ThreadSlice";
import { Col, ListGroup, Dropdown } from "react-bootstrap";
import { IoIosHeart, IoIosAdd } from "react-icons/io";

export default function ThreadsComponent(props) {
  let { selectedThread, setSelectedThread } = props;

  const [threads, setThreads] = useState([]);

  //get threads from the storage
  useEffect(() => {
    //get all the threads from the storage
    const threadsData = JSON.parse(localStorage.getItem("threads"));
    if (threadsData) {
      setThreads(threadsData);
    }
  }, []);



  //thread creation state mangment
  const [
    createThread,
    {
      data: threadresponse,
      isSuccess: threadIsSuccess,
      isLoading: threadIsLoading,
      isError: threadIsError,
      error: threadError,
    },
  ] = useCreateThreadMutation();


  
  //create new thread
  const handleCreateThread = (e) => {
    e.preventDefault();
    createThread();
  };

  //save the new thread in the browser and update the state
  useEffect(() => {
    if (threadIsSuccess) {
      // find threads in the storage
      let getThreads = localStorage.getItem("threads");
      let threads = [];

      // check if the thread storage exists
      if (getThreads) {
        threads = JSON.parse(getThreads);
      }

      // check on the response
      if (threadresponse !== null && threadresponse !== undefined) {
        // remove duplicates based on id
        const updatedThreads = [...threads, threadresponse].reduce(
          (acc, thread) => {
            const existingThread = acc.find((t) => t.id === thread.id);
            if (!existingThread && thread !== null) {
              acc.push(thread);
            }
            return acc;
          },
          []
        );

        // update the storage
        localStorage.setItem("threads", JSON.stringify(updatedThreads));

        // update the state
        setThreads(updatedThreads);
      } else {
        // error in case the response is null
        console.error(
          "threadresponse is null or undefined. Skipping concatenation."
        );
      }
    }
  }, [threadresponse]);

  //get thread
  const [getThread, { data: response, isError, isSuccess, isLoading, error }] =
    useLazyGetThreadQuery();

  return (
    <div>
      <ListGroup.Item
        className="new-chat"
        onClick={(e) => handleCreateThread(e)}
      >
        <IoIosAdd /> New Chat
      </ListGroup.Item>

      {threads &&
        threads.length > 0 &&
        threads.map((el, i) => {
          return (
            el && (
              <ListGroup.Item
                onClick={(e) => {
                  setSelectedThread(el.id);
                }}
                className={`${
                  selectedThread === el.id && "thread-active"
                } text-truncate`}
                key={i}
              >
                {el.id}
              </ListGroup.Item>
            )
          );
        })}
    </div>
  );
}
