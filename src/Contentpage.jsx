import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { AiOutlineMenu } from "react-icons/ai";

const Contentpage = () => {
  const [data, setData] = useState({});

  const [resultMsg, setResultMsg] = useState("");

  const [usersList, setUsersList] = useState([]);
  const [content, setContent] = useState("");

  const [dropdown, setDropdown] = useState(true);
  
  const [show, setShow]=useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/content")
      .then((response) => setData(response));
  }, []);
  useEffect(() => {
    if (resultMsg === "User added successfully") {
      getAPICALL();
    } else {
      setResultMsg("");
    }
  }, [resultMsg]);

  useEffect(() => {
    getAPICALL();
  }, []);

  console.log(usersList, "");
  async function getAPICALL() {
    const response = await fetch(`http://localhost:9000/content`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    setUsersList(result);

    console.log(result, "i am from get api call");
  }
  const onSubmit = (items) => {
    setContent(items);
  };

  const openDrop = () => {
    setDropdown(!dropdown);
  };

  let newContentsList = [];
  const contents =
    usersList &&
    usersList?.map((each) =>
      each.subtitle?.map((item, index) => {
        newContentsList.push(item.content);
      })
    );

  console.log(
    newContentsList,
    "newContentsListlkvmmmmmmmmmmmmmmmmmmmskdnvlksdgggggg"
  );

  const htmlFromCMS = newContentsList;
  console.log(htmlFromCMS, "dangerous html i am cms .........................");
  console.log(content, "content=====>");
  return (
    <div className="flex flex-row z-40 h-[100vh]  ">
      <div className="lg:w-[250px] md:w-[150px] sm:w-[100px] bg-slate-50 md:h-[100vh] lg:h-[100vh] position-fixed overflow-scroll sm:h-[4vh]"
      >
       <p className="text-blue-700 p-2 " 
          onClick={() => setShow(!show)}> <AiOutlineMenu style={{width:'25px', height:'25px' }} class=""/></p>
        {" "}
        { show ? 
        <div>
        {usersList?.map((item) => (
          <div >
            <div 
              class="text-teal-900 text-8px px-2  "
              
              
              onClick={() => openDrop()}
            >
              <p>{item.title}</p>
            </div>
           
            {!dropdown ? (
              <ul class="text-start text-blue-900 text-5px px-3 ">
                <li>
                  {item &&
                    item?.subtitle?.map((each) => (
                      <div>
                        <div
                          onClick={() => {
                            onSubmit(each.content);
                            window.history.replaceState(
                              null,
                              "new title",
                              `/${each.subtitlename}/${each._id}`
                            );
                          }}
                        >
                          {each.subtitlename}
                          {/* <Link to
                      ={`/contentpage/${each._id}`}
                      class="no-underline text-gray-800 text-xl">
                   
                      
                    </Link> */}
                        </div>
                        {/* <Link to
                        ={`/contentpage/${each._id}`}
                        class="no-underline text-gray-800 text-xl">
                      
                        {each.subtitlename} 
                      </Link> */}
                      </div>
                    ))}
                </li>
              </ul>
            ) : null}
          </div>
        ))} </div> : null
        }
       
      </div>
      <div className="lg:ml-[280px] md:ml-[180px] sm:ml-[100px] text-center justify-center ">
        <div className="">
          <div class="mt-[6%] ml-3px">
            {/* <Link to="/" target="_parent" className="btn btn-danger w-20 mx-5">
              Back
            </Link>  */}
            <div class="">{parse(content)}</div>
            <Link to="/" target="_parent" className="btn btn-danger w-20 mx-5">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contentpage;
