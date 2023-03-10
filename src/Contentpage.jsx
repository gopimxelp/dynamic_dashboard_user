import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { AiOutlineMenu } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import "./App.css";
const Contentpage = () => {
  const [data, setData] = useState({});

  const [resultMsg, setResultMsg] = useState("");

  const [usersList, setUsersList] = useState([]);
  const [content, setContent] = useState("");

  const [dropdown, setDropdown] = useState(true);

  const [dropDownContent, setDropDownContent] = useState(null);

  const [show, setShow] = useState(true);

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

  // console.log(usersList, "");
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

  const openDrop = (item) => {
    console.log(item, "item kishore");
    setDropDownContent(item);
    setDropdown(!dropdown);
  };

  let newContentsList = [];
  const contents =
    usersList &&
    usersList?.map((each, index) =>
      each.subtitle?.map((item, index) => {
        newContentsList.push(item.content);
      })
    );

  // console.log(
  //   newContentsList,
  //   "newContentsListlkvmmmmmmmmmmmmmmmmmmmskdnvlksdgggggg"
  // );

  console.log(dropDownContent, "content");

  const htmlFromCMS = newContentsList;
  // console.log(htmlFromCMS, "dangerous html i am cms .........................");
  // console.log(content, "content=====>");
  return (
    <div className="flex flex-row z-40 h-[100vh]  ">
      <div className="lg:w-[250px] md:w-[150px] sm:w-[100px] bg-slate-50 md:h-[100vh] lg:h-[100vh] position-fixed overflow-scroll sm:h-[4vh] cursor-pointer">
        <p className="text-blue-700 p-2 " onClick={() => setShow(!show)}>
          {" "}
          <AiOutlineMenu style={{ width: "25px", height: "25px" }} class="" />
        </p>{" "}
        {show ? (
          <div>
            {usersList?.map((item, index) => (
              <div className="">
                <div
                  class="text-teal-900 text-8px px-2  flex flex-row"
                  onClick={() => {
                    openDrop(item);
                  }}
                >
                  <div className="flex justify-between px-3 w-full">
                    <p>{item.title}</p>
                    <span>
                      <BiChevronRight
                        class="ang"
                        style={{
                          width: "25px",
                          height: "25px",
                          transform: "rotate(90deg)",
                        }}
                      />
                    </span>{" "}
                  </div>
                </div>

                {/* {!dropdown ? (
                  <ul class="text-start text-blue-900 text-5px px-4 ">
                    <li>
                      {item &&
                        item?.subtitle?.map((each, index) => (
                          <div>
                            <div
                              onClick={(index) => {
                                onSubmit(each.content);
                                window.history.replaceState(
                                  null,
                                  "new title",
                                  `/${each.subtitlename}/${each._id}`
                                );
                              }}
                              class="py-1 px-3"
                            >
                              {each.subtitlename}
                            </div>
                          </div>
                        ))}
                    </li>
                  </ul>
                ) : null} */}

                {!dropdown &&
                  dropDownContent &&
                  dropDownContent._id === item._id &&
                  dropDownContent?.subtitle.map((each) => (
                    <>
                      <div className="text-blue-700  px-3">
                        <div
                          onClick={() => {
                            onSubmit(each.content);
                            window.history.replaceState(
                              null,
                              "new title",
                              `/${each.subtitlename}/${each._id}`
                            );
                          }}
                          class="py-1 px-3"
                        >
                          {each.subtitlename}
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            ))}
          </div>
        ) : null}
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
