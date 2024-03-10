import React, { useContext } from "react";
import { LoginContext } from "../Context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deletedata, get }) => {

  const { account, setAccount } = useContext(LoginContext);

  const removedata = async (req,res) => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if(res.status === 400 || !data){
        console.log("error");
      } else {
        console.log("user delete");
        setAccount(data);
        get();
        toast.warn("Item Deleted from cart",{
          position: "top-center",
          autoClose: 1000,
        })
      }

    } catch (error) {
      console.log("Error in deleting data");
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: "pointer" }}>
        Save for Later
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: "pointer" }}>
        See more like this
      </p>
      <ToastContainer />
    </div>
  );
};

export default Option;
