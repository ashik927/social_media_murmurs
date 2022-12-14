import Online from "../../components/online/Online";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./follow.css";
import { useEffect, useState } from "react";
import { getAllFollowing } from "../../Service/Follow/Follow";

export const Follow = () => {
    const [allFollwer, setAllFollwer] = useState([])

    useEffect(async () => {
        const allFollwerData = await getAllFollowing(localStorage.getItem("userID"))
        setAllFollwer(allFollwerData.data)
        console.log("allFollwerData", allFollwerData)
    }, [])

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <h4 className="rightbarTitle">Follow</h4>
                {
                    allFollwer.length > 0 ? <ul className="rightbarFriendList">
                        {allFollwer && allFollwer.map((u, index) => (
                            <Online key={u.id} user={u} index={index} />
                        ))}
                    </ul> :
                        <div style={{ width: "1000px", margin: "15px" }}>
                            <p>No Follow</p>

                        </div>
                }

            </div>
        </>
    );
};