import {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = () => {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {   
        slug ? appwriteService.getPost(slug).then((post) => {
            (post && setPost(post));
        }) :
        navigate('/')
    }, [slug, navigate])
  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
    null
  )
}

export default EditPost