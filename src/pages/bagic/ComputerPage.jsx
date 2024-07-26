import React, { useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import ReactModal from 'react-modal';
ReactModal.setAppElement("#root");

function ComputerPage(props) {
    const layout = css`
        box-sizing: border-box;
        margin-bottom: 20px;
        border-bottom: 2px solid #dbdbdb;
    `;

    const emptyComputer = {
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    }

    const inputRefs = {
        company: useRef(),
        cpu: useRef(),
        ram: useRef(),
        ssd: useRef()
    }

    const [ registerComputer, setRegisterComputer ] = useState({...emptyComputer});
    const [ updateComputer, setupdateComputer ] = useState({...emptyComputer, computerId: ""});
    const [ computerList, setComputerList ] = useState([]);
    const [ params, setParams ] = useState({
        company: "",
        cpu: ""
    })
    const [ computerDetail, setComputerDetail ] = useState({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });
    const [ isModalOpen, setModalOpen ] = useState(false);

    const resetRegisterInput = () => {
        setRegisterComputer({...emptyComputer});
    }

    const resetSearchInput = () => {
        setParams({
            company: "",
            cpu:""
        });
    }

    const handleSearchInputChange = (e) => {
        setParams(params => {
            return {
                ...params,
                [e.target.name]: e.target.value
            }
        })

    }

    const handleRegisterInputChange = (e) => {
        setRegisterComputer(rc => {
            return {
                ...rc,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleRegisterInputKeyDown = (e) => {
        if(e.keyCode === 13) {
            const { company, cpu, ram, ssd } = inputRefs;
            switch(e.target.name) {
                case "company" :
                    cpu.current.focus();
                    break;
                case "cpu":
                    ram.current.focus();
                    break;
                case "ram":
                    ssd.current.focus();
                    break;
                case "ssd":
                    handleRegisterSubmitClick();
                    company.current.focus();
                    break;
                default:
                    break;
            }
        }
    }

    const handleSearchClick = async () => {
        requestComputerList();
        resetSearchInput();
    }

    const requestComputerList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/computers", {
                // params:params (여기 들어가는 객체의 key값이 params로 이미 등록되어 있음)
                // 여기 params를 넣어주면 QueryString으로 key=value로 넣어서 서버에 요청을 날림
                params
            });
            // 위랑 아래랑 같은 코드
            // const response = await axios.get(`http://localhost:8080/api/v1/computers?company=${params.company}&cpu=${params.cpu}`);
            console.log(response.data);
            setComputerList(response.data);
            alert("컴퓨터 목록 조회 성공");
        } catch (error) {
            alert("컴퓨터 목록 조회 실패\n" + error);
        }
    }

    const handleSelectComputerClick = async (computerId) => {
        // console.log(computerId);
        const data = await requestGetComputer(computerId);
        if(!data) {
            setComputerDetail({
                computerId: "",
                company: "",
                cpu: "",
                ram: "",
                ssd: ""
            });
            return;
        }
        setComputerDetail(data);
    }

    const requestGetComputer = async (computerId) => {
        let responseData = null;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/computer/${computerId}`);
            console.log(response);
            responseData = response.data;
        } catch (error) {
            console.error(error);
        }
        return responseData;
    }

    const handleRegisterSubmitClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/computer", registerComputer);
            if(response.status === 200) {
                alert("컴퓨터 등록 성공\n"+"제조사: " + registerComputer.company + "\n" + "CPU: " + registerComputer.cpu + "\n" + "RAM: " + registerComputer.ram + "\n" + "SSD: " + registerComputer.ssd);
                resetRegisterInput();
            }
        } catch(error) {
            alert("컴퓨터 등록 실패\n" + error);
        }
    }

    const handleUpdataComputerClick = async (computerId) => {
        setModalOpen(true);
        const data = await requestGetComputer(computerId);
        setupdateComputer(data);
    }

    const handleUpdateSubmitClick = async () => {
        await requestUpdateComputer();
        await requestComputerList();
        closeModal();
    }

    const requestUpdateComputer = async () => {
        let responseData = null;
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/computer/${updateComputer.computerId}`, updateComputer);
            responseData = response.data;
        } catch (error) {
            console.error(error);
        }
        return responseData;
    }

    const closeModal = () => {
        setModalOpen(false);
        setupdateComputer({
            ...emptyComputer,
            computerId: ""
        });
    }

    const handleUpdateInputChange = (e) => {
        setupdateComputer(uc => {
            return {
                ...uc,
                [e.target.name]: e.target.value
            }
        }); 
    }

    const handleDeleteComputerClick = async (computerId) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            await requestDeleteComputer(computerId);
            await requestComputerList();
            alert("삭제 완료!");
        }
    }

    const requestDeleteComputer = async (computerId) => {
        let responseData = null;
        try{
            const response = await axios.delete(`http://localhost:8080/api/v1/computer/${computerId}`);
            responseData = response.data;
        } catch(error) {
            console.error(error);
        }

        return responseData;
    }
    
    return (
        <div>
            <ReactModal style={{
                    content: {
                        boxSizing: 'border-box',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        padding: '20px',
                        width: '400px',
                        height: '400px',
                        backgroundColor: '#fafafa'
                    }
                }}
                isOpen = {isModalOpen}
                onRequestClose={closeModal}
            >
                <div css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                `}>
                    <h2>컴퓨터 정보 수정</h2>
                    <input type="text" name="computerId" onChange={handleUpdateInputChange} value={updateComputer.computerId} disabled={true}/>
                    <input type="text" name="company" placeholder='제조사' onChange={handleUpdateInputChange} value={updateComputer.company}/>
                    <input type="text" name="cpu" placeholder='CPU' onChange={handleUpdateInputChange} value={updateComputer.cpu}/>
                    <input type="text" name="ram" placeholder='RAM' onChange={handleUpdateInputChange} value={updateComputer.ram}/>
                    <input type="text" name="ssd" placeholder='SSD' onChange={handleUpdateInputChange} value={updateComputer.ssd}/>
                    <div>
                        <button onClick={handleUpdateSubmitClick}>확인</button>
                        <button onClick={() => closeModal()}>취소</button>
                    </div>
                </div>
            </ReactModal>
            <div css={layout}>
                <h2>목록</h2>
                <p>
                    <input type="text" name="company" onChange={handleSearchInputChange} value={params.company} placeholder="제조사" />
                    <input type="text" name="cpu" onChange={handleSearchInputChange} value={params.cpu} placeholder="CPU" />
                    <button onClick={handleSearchClick}>조회</button>
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>ID</th>
                            <th>제조사</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            computerList.map(computer => 
                                <tr key={computer.computerId}>
                                    <td><button onClick={() => handleSelectComputerClick(computer.computerId)}>선택</button></td>
                                    <td>{computer.computerId}</td>
                                    <td>{computer.company}</td>
                                    <td><button onClick={() => handleUpdataComputerClick(computer.computerId)}>수정</button></td>
                                    <td><button onClick={() => handleDeleteComputerClick(computer.computerId)}>삭제</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
            <div css={layout}>
                <h2>세부정보</h2>
                <ul>
                    <li>ID: {computerDetail.computerId}</li>
                    <li>제조사: {computerDetail.company}</li>
                    <li>CPU: {computerDetail.cpu}</li>
                    <li>RAM: {computerDetail.ram}</li>
                    <li>SSD: {computerDetail.ssd}</li>
                </ul>

            </div>
            <div css={layout}>
                <h2>등록</h2>
                <p>
                    <label htmlFor="">제조사: </label>
                    <input type="text"
                        name="company"
                        onChange={handleRegisterInputChange}
                        onKeyDown={handleRegisterInputKeyDown}
                        placeholder='제조사를 입력하세요.'
                        value={registerComputer.company}
                        ref={inputRefs.company}/>
                </p>
                <p>
                    <label htmlFor="">CPU: </label>
                    <input type="text"
                        name="cpu"
                        onChange={handleRegisterInputChange}
                        onKeyDown={handleRegisterInputKeyDown}
                        placeholder='cpu를 입력하세요.'
                        value={registerComputer.cpu}
                        ref={inputRefs.cpu}/>
                </p>
                <p>
                    <label htmlFor="">RAM: </label>
                    <input type="text"
                        name="ram"
                        onChange={handleRegisterInputChange}
                        onKeyDown={handleRegisterInputKeyDown}
                        placeholder='RAM을 입력하세요.'
                        value={registerComputer.ram}
                        ref={inputRefs.ram}/>
                </p>
                <p>
                    <label htmlFor="">SSD: </label>
                    <input type="text"
                        name="ssd"
                        onChange={handleRegisterInputChange}
                        onKeyDown={handleRegisterInputKeyDown}
                        placeholder='SSD를 입력하세요.'
                        value={registerComputer.ssd}
                        ref={inputRefs.ssd}/>
                </p>
                <p>
                    <button onClick={handleRegisterSubmitClick}>전송</button>
                </p>
            </div>
        </div>
    );
}

export default ComputerPage;