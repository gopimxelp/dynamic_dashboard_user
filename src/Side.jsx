import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Side = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [resultMsg, setResultMsg] = useState("");

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/content")
      .then((response) => setData(response));
  }, []);
  //   console.log(data,"basjdhjkhdasjkfhjkadsfhjkshdfjkdahfjkhjkd/....................")



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

  return (
    <div className="position-fixed bg-light h-[100vh] mt-18 p-0">
      {/* <aside className=" text-left p-2  ">
        <p className=" p-2 text-primary no-underline ">
          {" "}
          <b>Getting Started </b>
        </p>

        <ul>
          <a
            className=" no-underline p-2 text-red-200"
            href="/subtitle"
            component={usersList.id}
          >
            <b>{usersList.title}something</b>
          </a>

          {formData?.map((item, index) => (
            <>
              <li className="p-2">
                <Link
                  to={`/subtitle/${item.id}`}
                  className="no-underline text-primary "
                >
                  {item.text}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </aside> */}

      <div>
        {usersList?.map((item) => (
          <div>
            <div class="text-green-800 text-xl px-2">
              <b>{item.title}</b>
            </div>
            <ul>
              <li>
                {item &&
                  item?.subtitle?.map((each) => (
                    <div>
                      <Link to
                        ={`/contentpage/${item._id}`}
                        class="no-underline text-gray-800 text-xl">
                      
                        {each.subtitlename}
                      </Link>
                    </div>
                  ))}
              </li>
            </ul>
          </div>
        ))}
      </div>

      
    </div>
  );
};
export default Side;
