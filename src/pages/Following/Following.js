import Online from "../../components/online/Online";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./follow.css";
import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import { getAllFollowing } from "../../Service/Follow/Follow";

export const Following = () => {
    const [allFollwering, setallFollwering] = useState([])

    useEffect(async () => {
        const allFollweringData = await getAllFollowing(localStorage.getItem("userID"))
        setallFollwering(allFollweringData.data)
        console.log("allFollweringData", allFollweringData)
    }, [])

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <h4 className="rightbarTitle">Following</h4>
                {
                    allFollwering.length > 0 ? <ul className="rightbarFriendList">
                        {allFollwering && allFollwering.map((u, index) => (
                            <Online key={u.id} user={u} index={index} />
                        ))}
                    </ul> :
                        <div style={{width:"1000px" , margin:"15px"}}>
                            <p>No Following</p>
                        </div>
                }

            </div>
        </>
    );
};