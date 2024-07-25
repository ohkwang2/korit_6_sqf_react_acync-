import axios from 'axios';
import React, { useState } from 'react';

function RegisterSizePage(props) {
    
    const emptySize = {
        sizeName: ""
    }

    const [ size, setSize ] = useState({...emptySize});

    const handleInputChange = (e) => {
        setSize(size => {
            return {
                ...size,
                [e.target.name]: e.target.value
            }
        })
    }

    const resetSize = () => {
        setSize({...emptySize})
    }

    const handleSubmitClick = async () => {
        try{
            const response = await axios.post("http://localhost:8080/api/v1/size", size);
            size = response.data;
            // console.log(response.data);
            alert("사이즈 등록 성공\n" + "등록 사이즈 이름: " + size.sizeName);
        } catch (error){
            console.error(error);
            alert(error);
        }
        resetSize();
    }

    
    
    return (
        <div>
            <h1>사이즈 등록 페이지</h1>
            <p>
                <label htmlFor="">사이즈 이름</label>
                <input type="text" name="sizeName" onChange={handleInputChange} value={size.sizeName} placeholder='사이즈를 입력하세요.'/>
            </p>
            <p>
                <button onClick={handleSubmitClick}>등록</button>
            </p>
        </div>
    );
}

export default RegisterSizePage;