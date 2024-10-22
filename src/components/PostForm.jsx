import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { updatePost, createPost } from "../API";
import { t } from "i18next";

const PostForm = ({ post, resetSelectedPost }) => {
    //useState to populate form fields if a post was selected for update
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setUserId(post.userId);
            setBody(post.body);
        } else{
            setTitle('');
            setBody('');
            setUserId('');
        }
    }, [post]);

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: post ? updatePost : createPost,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            if (post) {
                console.log('Post updated successfully');
                queryClient.setQueryData(['posts'], (existingPosts) => {
                    return existingPosts.map((post) => (post.id === data.id ? data : post));
                })
            } else {
                console.log('Post created with ID:', data.id);
                queryClient.setQueryData(['posts'], (existingPosts) => [...existingPosts, data]);
            }
            //queryClient.invalidateQueries(['posts']);
            setTimeout(() => setShowSuccessAlert(false), 1000);
            setBody('');
            setTitle('');
            setUserId('');
            setTimeout(() => resetSelectedPost(), 1000);
        },
    });

    const newPost = useMemo(() => ({
        id: post?.id,
        userId: userId,
        title: title,
        body: body
    }), [post, userId, title, body]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        mutate(newPost);
        console.log("Post Submitted");
    }, [newPost, mutate]);

    return (
        <section>
            {isError && <Alert variant="danger">{t('errorText')} {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">{post ? t('alertUpdateText') : t('alertCreateText')}</Alert>}
            <Col className="m-2 md-6">
                <Form onSubmit={handleSubmit} className="border p-3 rounded-4 border-dark">
                    <h3>{t('postForm')}</h3>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>{t('titleText')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={t('formPostTitle')}
                            name="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            aria-label={t('formPostTitle')} 
                            aria-describedby="titleHelpBlock"
                            required />
                        <Form.Control.Feedback type="invalid" id="titleHelpBlock">
                            {t('validTitle')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="userid">
                        <Form.Label>{t('userText')}</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder={t('formUserId')}
                            name="userid" 
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)} 
                            aria-label={t('formUserId')} 
                            aria-describedby="userIdHelpBlock"
                            required />
                        <Form.Control.Feedback type="invalid" id="userIdHelpBlock">
                            {t('validId')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="body">
                        <Form.Label>{t('body')}</Form.Label>
                        <Form.Control 
                            name="body" 
                            as="textarea" 
                            rows={3} 
                            value={body} 
                            onChange={(e) => setBody(e.target.value)} 
                            aria-label={t('body')} 
                            aria-describedby="bodyHelpBlock"
                            required />
                        <Form.Control.Feedback type="inavlid" id="bodyHelpBlock">
                            {t('validBody')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {post && <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? t('updating') : t('updateText') }</Button>}
                    {!post && <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? t('adding') : t('addText') }</Button>}
                </Form>
            </Col>
        </section>
    );
}

export default PostForm