import { useEffect, useState } from "react";

import "./Profile.css";

const BASE_URL = "https://dummyjson.com/users/";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetch(BASE_URL + `${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        for (const key in res) {
          setUserData({ ...userData, key: res.key });
        }
      });
  }, []);
  return (<>
    <table>
      {Object.keys(userData).map((data, i) => {
        console.log(data);
        return (
          <tr>
            <td>data</td>
            <td>userData.data</td>
          </tr>
        );
      })}
    </table>
  </>);
};

export default Profile;
