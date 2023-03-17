import { useState,  useEffect } from 'react';
import '../css/chat.css';
import $ from 'jquery';

function Dropdown() {

    const [users, setUsers] = useState([]);

    // get all the list of users once the component is loaded
    useEffect(() => {

        console.log("Started");
        $.ajax({
            url: "http://localhost:8081/user",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data, textStatus, xhr) {
                //console.log(data);
                //console.log(textStatus);
                if (data != null) {

                    setUsers(data);

                } else {
                    console.log("Issue in retrieving...");
                }


            },
            error: function (xhr, textStatus, err) {
                console.log(err);

            }
        });
    }, [])

    return (
        <div className="selectWrapper">
            <select className="selectBox" id="friend">
                <option key={'Select Friend'} value={'None'}>Select Friend</option>
                {users.map((user) => (
                    <option key={user['username']} value={user['username']}>{user['username']}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;