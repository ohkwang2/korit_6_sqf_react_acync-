import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { reset } from './styles/global';
import PostPage from './pages/bagic/PostPage';
import DeletePage from './pages/bagic/DeletePage';
import PutPage from './pages/bagic/PutPage';
import GetPage from './pages/bagic/GetPage';
import MainLayout from './components/Sidebar/MainLayout/MainLayout';
import Sidebar from './components/Sidebar/Sidebar';
import MainContainer from './components/MainContainer/MainContainer';
import PostPage2 from './pages/bagic/PostPage2';
import PromisePage from './pages/bagic/PromisePage';
import RegisterSizePage from './pages/bagic/RegisterSizePage';
import RegisterColorPage from './pages/bagic/RegisterColorPage';
import ComputerPage from './pages/bagic/ComputerPage';

function App() {
  return (
    <>
      <Global styles={reset}/>
      {/* 스프링에서 controller 영역 */}
      <MainLayout>
        <Sidebar />
        <MainContainer>
          <Routes>
              <Route path="/async/basic/post" element={<PostPage />} />
              <Route path="/async/basic/post2" element={<PostPage2 />} />
              <Route path="/async/basic/get" element={<GetPage />} />
              <Route path="/async/basic/put" element={<PutPage />} />
              <Route path="/async/basic/delete" element={<DeletePage/>} />
              <Route path="/async/basic/promise" element={<PromisePage/>} />
              <Route path='/async/basic/size/register' element={<RegisterSizePage />}/>
              <Route path='/async/basic/color/register' element={<RegisterColorPage />}/>
              <Route path='/computer' element={<ComputerPage />}/>
          </Routes>
        </MainContainer>
      </MainLayout>
    </>
  );
}

export default App;
