import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import client from "../../api";
import "./Create.css";
import ImageUploading from 'react-images-uploading';
import storage from "../../firebase/index";
import MainLayout from '../../components/Layout/mainLayout';
import swal from 'sweetalert';
function CreatePost() {

    const [form, setForm] = useState({ title: '', description: '' });
    const [images, setImages] = useState([]);
    const history = useHistory();


    const onChangeForm = (e) => {
        const { value, name } = e.target;
        console.log(name);
        setForm({
            ...form,
            [name]: value
        });
    };

    const onChangeImage = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const onHandleSubmit = async (e) => {
        console.log('vao day');
        e.preventDefault();
        const image = images[0];
        console.log(image);
        if (image && form.title) {
            try {
                const imageUrl = await uploadFile(image.file);
                console.log(imageUrl);
                const res = await client({
                    url: '/api/posts',
                    method: 'POST',
                    data: {
                        title: form.title,
                        content: form.description,
                        imageUrl: imageUrl,
                    }
                })
                console.log('vao day 2');
                if (res.data.success) {
                    setForm({ title: '', description: '' });
                    setImages([]);
                    swal({
                        title: "Tạo bài thành công",
                        text: "",
                        icon: "success",
                        button: "Aww yiss!",
                    }).then(() => {
                        history.push('/');
                    });
                    
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref().child(file.name).put(file);
            const onProgress = () => {

            };
            const onError = (err) => reject(err);
            const onSuccess = () => {
                uploadTask
                    .snapshot
                    .ref
                    .getDownloadURL().then((getDownloadURL) => resolve(getDownloadURL))
            };
            uploadTask.on('state_changed', onProgress, onError, onSuccess);
        })
    }

    const hiddenButton = images.length > 0;
    const clsUploadBtn = hiddenButton ? 'hidden' : '';
    return (
        <MainLayout>
            <div className="createForm-container">
                <div className="createForm-wrapper">
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Text className="text">
                            Thêm bài viết
                    </Form.Text>
                        <Form.Text style={{ color: "red" }} className="text">
                            Thông tin cơ bản
                    </Form.Text>
                        <Form.Group as={Row} >
                            <Form.Label className="text-element" column sm="2">
                                Tên bài viết
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control className="formControl" type="text"
                                    placeholder="Nhập nội dung"
                                    value={form.title}
                                    name="title"
                                    onChange={onChangeForm} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className="text-element" column sm="2" >
                                Nội dung
                        </Form.Label>
                            <Form.Control className="formControl-area" as="textarea"
                                value={form.description}
                                name="description"
                                onChange={onChangeForm} />
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label className="text-element" column sm="2">
                                Địa chỉ
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control className="formControl" type="text" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label className="text-element" column sm="2">
                                Giá cả
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control className="formControl" type="text" />
                            </Col>
                        </Form.Group>
                        <Form>
                            <Form.Group as={Row} >
                                <Form.Label className="text-element" column sm="2">
                                    Chất lượng
                            </Form.Label>
                                <Form.Control className="formControl-rate" type="range" custom />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group as={Row} >
                                <Form.Label className="text-element" column sm="2">
                                    Phục Vụ
                            </Form.Label>
                                <Form.Control className="formControl-rate" type="range" custom />
                            </Form.Group>
                        </Form>
                        <div>
                            <ImageUploading maxNumber={1} onChange={onChangeImage} value={images} dataURLKey="data_url">
                                {
                                    ({
                                        imageList,
                                        onImageUpload,
                                        onImageUpdate,
                                        onImageRemove,
                                    }) => {
                                        return (
                                            <div className="upload-wrapper">
                                                <Button className={clsUploadBtn} onClick={onImageUpload}>Upload image</Button>
                                                {imageList.map((image, index) => {
                                                    return (
                                                        <div key={index} className="image-item">
                                                            <span className="remove-btn" onClick={onImageRemove}>x</span>
                                                            <div className="image-wrapper" onClick={onImageUpdate}>
                                                                <img src={image.data_url} alt="" />
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                }
                            </ImageUploading>
                        </div>
                        <Button className="submitBtn" variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreatePost;