import React from 'react';
import useInput from '../../hooks/useInput';
import axios from 'axios';

function PostPage(props) {
    
    const studentSchoolNameInput = useInput();
    const studentDepartmentInput = useInput();
    const studentGradeInput = useInput();
    const studentNameInput = useInput();
    const teacherSchoolNameInput = useInput();
    const teacherPhoneInput = useInput();
    const teacherAddressInput = useInput();
    const teacherNameInput = useInput();

    const handleSubmitStudent = () => {
        const student = {
            schoolName: studentSchoolNameInput.value,
            department: studentDepartmentInput.value,
            grade: studentGradeInput.value,
            name: studentNameInput.value
        }

        // 비동기 통신 fetch를 사용할 경우
        // post 요청은 객체를 JSON형태로 전달함
        // fetch("http://localhost:8080/basic/student", {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(student)
        // }).then(response => {
        //     response.json().then(responseData => {
        //         console.log(responseData);
        //     })
        // })

        // 비동기 통신 axios를 사용할 경우
        // post 요청은 객체를 JSON형태로 전달함
        // axios는 fetch를 기반으로 라이브러리로 만들어 놓은 것
        axios.post("http://localhost:8080/basic/student", student)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            studentSchoolNameInput.setValue("");
            studentDepartmentInput.setValue("");
            studentGradeInput.setValue("");
            studentNameInput.setValue("");
        });

        console.log(student);
    }

    const handleSubmitTeacher = () => {
        const teacher = {
            schoolName: teacherSchoolNameInput.value,
            phone: teacherPhoneInput.value,
            address: teacherAddressInput.value,
            name: teacherNameInput.value
        }

        axios.post("http://localhost:8080/basic/teacher", teacher)
        .then(response => {
            console.log(response.data);
        }). catch(error => {
            console.log(error);
        })
        console.log(teacher);
    }

    return (
        <>
            <header>
                <h1>비동기 통신(POST)</h1>
            </header>
            <main>
                <h3>학생정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text"
                        onChange={studentSchoolNameInput.onChange}
                        value={studentSchoolNameInput.value} />
                </p>
                <p>
                    <label htmlFor="">학과명: </label>
                    <input type="text"
                        onChange={studentDepartmentInput.onChange}
                        value={studentDepartmentInput.value} />
                </p>
                <p>
                    <label htmlFor="">학년: </label>
                    <input type="text"
                        onChange={studentGradeInput.onChange}
                        value={studentGradeInput.value} />
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text"
                        onChange={studentNameInput.onChange}
                        value={studentNameInput.value} />
                </p>
                <p>
                    <button onClick={handleSubmitStudent}>전송</button>
                </p>

                <h3>선생님 정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text"
                        onChange={teacherSchoolNameInput.onChange}
                        value={teacherSchoolNameInput.value} />
                </p>
                <p>
                    <label htmlFor="">연락처: </label>
                    <input type="text"
                        onChange={teacherPhoneInput.onChange}
                        value={teacherPhoneInput.value} />
                </p>
                <p>
                    <label htmlFor="">주소: </label>
                    <input type="text"
                        onChange={teacherAddressInput.onChange}
                        value={teacherAddressInput.value} />
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text"
                        onChange={teacherNameInput.onChange}
                        value={teacherNameInput.value} />
                </p>
                <p>
                    <button onClick={handleSubmitTeacher}>전송</button>
                </p>
            </main>
        </>
    );
}

export default PostPage;