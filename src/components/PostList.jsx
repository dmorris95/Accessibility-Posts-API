import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import { fetchPosts, deletePost } from "../API";
import { t } from "i18next";


const PostList = ({ onPostClick }) => {
    const queryClient = useQueryClient();
    const [filterId, setFilterId] = useState('');

    const { data, isLoading, isSuccess, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000, 
        cacheTime: 15 * 60 * 1000
    });

    const delPost = useMutation({
        mutationFn: deletePost,
        onSuccess: (data, postId) => {
            console.log('Post deleted successfully')
            queryClient.setQueryData(['posts'], (existingPosts) => {
                return existingPosts.filter(post => post.id !== postId);
            });
        },
    });

    //Post Memoization
    const filterPosts = useMemo(() => {
        //Data check in case an undefined value is returned from the API call
        return data ? data.filter(post => post.userId.toString().includes(filterId)) : [];
    }, [data, filterId]);

    //Memoize the postClick (The UserSelect in this program)
    const handlePostClick = useCallback((post) => {
        onPostClick(post);
    }, [onPostClick]);


    if (isLoading) return <Spinner animation="border" role="status"><span className="visually-hidden">{t('loadingText')}</span></Spinner>;
    if (error) return <Alert variant="danger">{t('fetchError')}</Alert>;

    return (
        <section>
            <header>
                <input className="mb-3 bg-light border-primary rounded-2" aria-label={t('filterText')} name="filterId" type="number" value={filterId} placeholder={t('filterText')} onChange={(e) => setFilterId(e.target.value)}/>
            </header>
            {isSuccess && filterPosts.map(post => (
                <article key={post.id} className="mb-3" aria-labelledby="postTitle" aria-describedby="postBody">
                <Card>
                    <Card.Body>
                        <Card.Title id="postTitle">{post.title}</Card.Title>
                        <Card.Text id="postBody">{post.body}</Card.Text>
                        <Button variant="primary" onClick={() => handlePostClick(post)}>{t('editText')}</Button>
                        <Button variant="danger" onClick={() => delPost.mutate(post.id)}>{t('deleteText')}</Button>
                    </Card.Body>
                </Card>
                </article>
            ))}
        </section>
    );
}

export default PostList