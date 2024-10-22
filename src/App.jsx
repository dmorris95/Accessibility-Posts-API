import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

const queryClient = new QueryClient();

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const resetSelectedPost = () => {
    setSelectedPost(null);
  };


  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Row>
          <h1 className='text-center m-4' aria-label={t('pageHeader')}>{t('pageHeader')}</h1>
          <Nav className='justify-content-center' as='nav' role='menubar'>
            <Nav.Link className='bg-secondary rounded-3 text-white m-2' onClick={() => changeLanguage('en')}>English</Nav.Link>
            <Nav.Link className='bg-secondary rounded-3 text-white m-2' onClick={() => changeLanguage('pt')}>Portugese</Nav.Link>
          </Nav>
          <Col>
            <PostList onPostClick={handlePostClick}/>
          </Col>
          <Col>
            <PostForm post={selectedPost} resetSelectedPost={resetSelectedPost}/>
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
}

export default App
