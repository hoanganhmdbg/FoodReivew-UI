import MainLayout from '../Layout/mainLayout';
import { Container } from 'react-bootstrap';
import './Detail.style.css';
import client from "../../api";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';

function PostCard(props) {
    const [loading, setLoading] = useState(false);
    const [detailpost, setDetailpost] = useState();
    const [comments, setComments] = useState();
    const [show, setShow] = useState(false);
    const [newComment, setNewcomment] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id } = useParams();

    const handleOk = async () => {
        //console.log(newComment);
        const res = await client({
            url: '/api/comment',
            method: 'POST',
            data: {
                content: newComment,
                postId: id
            }
        })
        if (res.data.success) {
            setShow(false);
            // đổi state comments
            const newComment = res.data.data;
            // { createdBy: id }
            // { createdBy: { username: 'a' }
            setComments([...comments, newComment]);
        }
    }


    const onChangeTextarea = e => {
        setNewcomment(e.target.value);
    }

    const getDetailpost = async () => {
        console.log(id);
        const res = await client({
            url: `/api/posts/${id}`,
            method: 'GET',
        })
        if (res.data.success) {
            const { comments, ...post } = res.data.data;
            console.log(comments, post);
            setDetailpost(post);
            setComments(comments);
        }
    }

    const renderComments = () => {
        if (loading) return <div>Loading...</div>
        if (!comments) return <div>Post chưa có bình luận</div>
        return comments.map(comment => (
            <div className="comment-wraper mt-3 mb-3" key={comment._id}>
                <div className="username">
                    <Avatar src="/broken-image.jpg" />
                    <span className='name'>{comment.createdBy['name']}</span>
                </div>
                <div className="comment-content">
                    {comment.content}
                </div>
            </div>
        ))
    }


    useEffect(() => {
        getDetailpost();
    }, []);

    if (loading) return <div>Loading...</div>
    if (!detailpost) return <div>Khong co du lieu</div>
    return (
        <MainLayout>
            <Container>
                <div className="container">
                    <div className="card-wrapper row">
                        <div className="img col-md-5">
                            <img alt="img" height="280px" width="100%" src={detailpost.imageUrl}></img>
                        </div>
                        <div className="content col-md-7">
                            <div className="title">
                                {detailpost.title}
                            </div>
                            <div className="description" >
                                {detailpost.content}
                                {/* Thấy quán này đc nhiều blogger khen lắm, khen từ hồi xưa quán mới mở luôn nên đi ăn thử. */}
                            </div>
                            <div className="rating">
                                <div className="overall">
                                    <div className="content">
                                        6.0
                                </div>
                                </div>
                                <div className="rating1">
                                    <div>
                                        <h12>7.0</h12>
                                    </div>
                                    <div>
                                        <p>Chất lượng</p>
                                    </div>
                                </div>
                                <div className="rating2">
                                    <div>
                                        <h12>6.0</h12>
                                    </div>
                                    <div>
                                        <p>Vị trí</p>
                                    </div>
                                </div>
                                <div className="rating3">
                                    <div>
                                        <h12>5.0</h12>
                                    </div>
                                    <div>
                                        <p>Giá cả</p>
                                    </div>
                                </div>
                            </div>
                            <div className="information">
                                <div>
                                    <text>🕔 Đang mở cửa</text>
                                </div>
                                <div>
                                    💲 200.000-20.000.000
                            </div>
                                <div>
                                    🏳 29B Thành Công
                            </div>
                            </div>
                        </div>
                    </div>
                    <button className="comment-btn btn " onClick={handleShow}>
                        Viết bình luận
                </button>
                    <div className="comment-container mt-3">
                        {renderComments()}
                    </div>
                </div>

                <Modal contentClassName="modal-container" show={show} onHide={handleClose}>
                    <div>
                        <Form.Group className="text-area" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control onChange={onChangeTextarea} as="textarea" rows={3} />
                        </Form.Group>
                    </div>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleOk}>
                            Hoàn tất
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </MainLayout>
    )
}

export default PostCard;