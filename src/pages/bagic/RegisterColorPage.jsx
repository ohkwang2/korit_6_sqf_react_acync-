import axios from 'axios';
import React, { useState } from 'react';

function RegisterColorPage(props) {
    
    const emptyColor = {
        colorName: ""
    }

    const [ color, setColor ] = useState({...emptyColor});

    const handleInputChange = (e) => {
        setColor(color => {
            return {
                ...color,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleInputKeyDown = (e) => {
        if(e.keyCode === 13) {
            handleSubmitClick();
        }
    }

    const resetColor = () => {
        setColor({...emptyColor});
    }

    const handleSubmitClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/color", color);
            alert("컬러 등록 성공\n" + "컬러 이름: " + color.colorName);
            resetColor();
        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div>
            <div>
                <h1>컬러 등록 페이지</h1>
                <p>
                    <label htmlFor="">컬러 이름: </label>
                    <input type="text" name="colorName"
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        value={color.value}
                        placeholder='컬러 이름을 입력하세요.'/>
                </p>
                <p>
                    <button onClick={handleSubmitClick}>등록</button>
                </p>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Color name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // color.map(color => {})
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RegisterColorPage;
