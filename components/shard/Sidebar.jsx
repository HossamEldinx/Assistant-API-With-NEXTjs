import { useState, useEffect, useContext } from 'react';
import {
    MdClose,
    MdMenu,
    MdOutlineCoffee,
    MdOutlineVpnKey,
    MdDelete,
    Mdhear
} from 'react-icons/md';
import React from 'react';
import { Col, ListGroup, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { IoIosHeart, IoIosAdd } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa";
import ThreadsComponent from '../thread/ThreadsComponent';



const SideBar = (props) => {
    let { selectedAssistant, setSelectedAssistant, assistants, setSelectedThread, selectedThread } = props;

    return (
        <div>

            <ListGroup variant='dark' className='chat-list'>
              <ListGroup.Item action>
       {/*              {assistants && assistants.length > 0 &&
                        <select
                            className="form-select"
                            onChange={e => setSelectedAssistant(e.target.value)}>

                            {assistants.map((el, i) => {
                                return <option key={i} value={el.id}>{el.name}</option>
                            })}

                        </select>} */}
                </ListGroup.Item> 


                <ThreadsComponent
                    selectedThread={selectedThread}
                    setSelectedThread={setSelectedThread} />

            </ListGroup>



            <ListGroup variant='dark'>
                <ListGroup.Item action>
                    <IoIosHeart className='ico' />
                    <Link href="https://patreon.com/Codewello" >
                        Support This Project
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item action>

                    <FaYoutube className='ico' />

                    <Link href="https://patreon.com/Codewello" >
                        Codewello
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item action>
                    <FaGithubAlt className='ico' />

                    <Link href="https://patreon.com/Codewello" >
                        Github
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </div>

    );
};

export default SideBar;