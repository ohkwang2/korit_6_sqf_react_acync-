import React, { useEffect, useState } from 'react';
import { COLOR_OPTIONS, SIZE_OPTIONS } from '../../constants/productOptions';
import axios from 'axios';

function PostPage2(props) {
    const emptyProduct = {
        productName: "",
        price: "",
        sizeId: "",
        colorId: "",
    }

    const [ sizeOptions, setSizeOptions ] = useState([]);
    const [ colorOptions, setColorOptions ] = useState([]);

    useEffect(() => {
        const getSize = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/sizes");
            // console.log(response.data);
            setSizeOptions([...response.data]);
            setProduct(product => ({
                ...product,
                sizeId: response.data[0].sizeId
            }));
        }

        const getColor = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/colors");
            // console.log(response.data);
            setColorOptions([...response.data]);
            setProduct(product => ({
                ...product,
                colorId: response.data[0].colorId
            }));
        }
        // index.js의 StrictMode 때문에 초기 2번 랜딩해서 해당 메소드가 두 번 실행 됨
        getSize();
        getColor();
    }, []);

    const [ product, setProduct ] = useState({
        ...emptyProduct
    });
    
    const handleInputChange = (e) => {
        setProduct(product => {
            return {
                ...product,
                [e.target.name]: e.target.value
            }
        })
    }

    const resetProduct = () => {
        setProduct({...emptyProduct});
    }

    const handleSubmitClick = async () => {
        try {
            // promise 객체 앞에만 await을 달 수 있으며, 비동기 처리가 될 때 까지 기다려라는 의미
            // await을 붙일 경우 response.then(responseData => 결과값)이 return 됨 (resolve 값)
            // 에러가 발생하여 throw 될 경우 catch로 넘어감
            const response = await axios.post("http://localhost:8080/api/v1/product", product);
            console.log(response);
            resetProduct();

            // async wait을 안 쓸 경우 response를 바로 찍을 경우 undefined가 나옴
            // const response = axios.post("http://localhost:8080/basic/product", product);
            // console.log(response);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <h1>비동기 데이터 통신(POST2)</h1>
            </header>
            <main>
                <h3>상품등록</h3>
                <p>
                    <label htmlFor="">상품명: </label>
                    <input type="text"
                    name="productName"
                    onChange={handleInputChange}
                    value={product.productName}/>
                </p>
                <p>
                    <label htmlFor="">가격: </label>
                    <input type="text"
                    name="price"
                    onChange={handleInputChange}
                    value={product.price}/>
                </p>
                <p>
                    <label htmlFor="">사이즈: </label>
                    <select name="sizeId" onChange={handleInputChange} value={product.sizeId}>
                        {
                            sizeOptions.map(size =>
                            // key값을 잡아주면 전체 렌더링이 아니라 부분 렌더링이 일어남
                            <option key={size.sizeId} value={size.sizeId}>{size.sizeName}</option>)
                        }
                    </select>
                </p>
                <p>
                    <label htmlFor="">색상: </label>
                    <select name="colorId" onChange={handleInputChange} value={product.colorId}>
                        {
                            colorOptions.map(color =>
                            // key값을 잡아주면 전체 렌더링이 아니라 부분 렌더링이 일어남
                            <option key={color.colorId} value={color.colorId}>{color.colorName}</option>)
                        }
                    </select>
                </p>
                <p>
                    <button onClick={handleSubmitClick}>등록하기</button>
                </p>

            </main>
        </>
    );
}

export default PostPage2;