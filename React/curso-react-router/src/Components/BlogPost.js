import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogdata } from '../Utils/blogdata'
import { useAuth} from '../Utils/auth'

function BlogPost() {
    const auth = useAuth()
    const { slug } = useParams()
    const navigate = useNavigate()

    const blogpost = blogdata.find(post => post.slug === slug)

    const canDelete = auth.user?.isAdmin || blogpost.auth === auth.user?.username

    const returnToBlog = () => {
        navigate('/blog')
    }
    return (
        <>
            <h2>{blogpost.title}</h2>
            <button onClick={returnToBlog}>Volver al blog</button>
            <p>{blogpost.auth}</p>
            <p>{blogpost.content}</p>
            {canDelete && (
                <button>Eliminar blogpost</button>
            )}
        </>
    )
}

export { BlogPost }