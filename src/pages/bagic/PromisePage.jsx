import React from 'react';
import { Ri24HoursFill } from 'react-icons/ri';

function PromisePage(props) {

    const loop = (name) => {
        // random 0과 1사이의 랜덤한 값 반환
        const random = Math.floor(Math.random() * 100) + 1; // 절삭시 0이 절대 나오지 않게끔 + 1 해줌
        for(let i = 0; i < random; i++) {
            console.log(`${name}: ${i}`);
        }
    }
    const testPrmoise = async () => {
        const response = {
            status: 200,
            data: ""
        } 
        loop("test");
        if(response.status === 400) {
            throw new Error(); // 여기서 throw new Error()가 Promise 객체의 reject
        }
        return response; // 여기서 return은 Promise 객체의 resolve
    }

    const testPrmoise2 = () => {
        return new Promise((resolve, reject) =>{
            loop("test2");
            resolve("test2 반복 완료");
        });
    }

    const testPrmoise3 = () => {
        return new Promise((resolve, reject) =>{
            loop("test3");
            resolve("test3 반복 완료");
        });
    }

    // 지금 현재 4번과 5번이 같은 코드
    // const testPrmoise4 = () => {
    //     return new Promise((resolve, reject) =>{
           

    //     });
    // }

    // const testPrmoise5 = async () => {
        
    // }

    // 지금 현재 4번과 5번이 같은 코드
    const testPrmoise4 = (num) => {
        return new Promise((resolve, reject) =>{
            console.log("test4");
            if(num === 0) {
                reject("test4 오류!!!");  // reject는 기다렸다가 다 되면 터트림
                return;
            }
            resolve("test4 성공");
        });
    }

    const testPrmoise5 = async (num) => {
        console.log("test5");
        if(num === 0) {
            throw new Error("test5 오류");  //throw는 강제로 예외를 바로 터트림 (reject보다 우선순위가 더 높음)
        }
        return "test5 성공";
    }

    const handleClick1 = () => {
        // 프로미스 뒤 실행문이 순차적으로 출력되려면 then으로 순서를 지정해주어야 함.
        // 혹은 async await 사용
        testPrmoise().then(r => {
            console.log(r);
            testPrmoise3().then(r => {
                console.log(r);
                testPrmoise2().then(r => {
                    console.log(r);
                })
            })
        });
    }

    // async안에서만 await을 사용할 수 있음.
    const handleClick2 = async () => {
        const r = await testPrmoise();
        console.log(r);
        const r2 = await testPrmoise3();
        console.log(r2);
        const r3 = await testPrmoise2();
        console.log(r3);
    }

    // 3번과 4번 같은 코드
    const handleClick3 = () => {
        testPrmoise4(0)
        .then(r => {
            console.log(r);
            testPrmoise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.error(e);
            })
        })
        .catch(e => {
            console.error(e);
            testPrmoise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.error(e);
            })
        })
        
    }

    const handleClick4 = async () => {
        try{
            const r = await testPrmoise4 (0);
            console.log(r);
        } catch (e) {
            console.error(e);
        }

        try {
            const r2 = await testPrmoise5(0);
            console.log(r2);
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <div>
            <button onClick={handleClick1}>버튼1</button>
            <button onClick={handleClick2}>버튼2</button>
            <button onClick={handleClick3}>버튼3</button>
            <button onClick={handleClick4}>버튼4</button>
        </div>
    );
}

export default PromisePage;