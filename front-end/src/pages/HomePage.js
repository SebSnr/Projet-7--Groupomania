import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { AuthContext } from "../App"
import axios from 'axios'
import { ApiUrl } from '../variables-config'
import ArticleCard from "../components/ArticleCard"
import ArticleForm from "../components/ArticleForm"


export default function HomePage() {

	const { AuthState } = useContext(AuthContext) 

    return (
        <div className="">
            <Navigation />
            { AuthState.isAuthenticated ? <HomeContent /> : "Veuillez vous connecter pour accéder au contenu de cette page" }
        </div>
    )

}

function HomeContent() {

    // state articles data
    const [articlesData, setArticlesData] = useState([])

    // event: get article at the loading page
    useEffect(() => {getArticles()}, [])

    // get user token by the local storage
    const token = JSON.parse(localStorage.getItem("token"))

    // get articles
    const getArticles = () => {
            axios({
                method: "get",
                url: `${ApiUrl}/articles`,
                headers: {"Authorization" : `Bearer ${token}`}
              })
            .then((res) => {
                setArticlesData(res.data)
                console.log(res.data)
            })
    }    

    return (
        <div className="container home-content">
            
            <ArticleForm />
            
            <div className="row d-lg-flex justify-content-lg-around">
                {articlesData
                    .sort(function(a, b) {
                        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    })
                    .map((article) => (
                        <ArticleCard article={article} key={article.id} />
                    ))
                }
            </div>
        </div>
    )
}

