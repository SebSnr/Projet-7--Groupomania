import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../App"
import axios from "axios"
// Components
import Navigation from "../components/Navigation"
import ArticleForm from "../components/ArticleForm"
import ArticleCard from "../components/ArticleCard"
import ProfileBar from "../components/ProfileBar"
import ErrorPage from "../components/ErrorPage"
import Members from "../components/Members"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function HomePage() {
	// use authentication globalstate
	const {AuthState} = useContext(AuthContext)

	// redirection to login page
	if (!AuthState.isAuthenticated) {
		window.location = "/login"
		return <ErrorPage />
	} else {
		return (
			<React.Fragment>
				<Navigation />
				<HomeContent />
			</React.Fragment>
		)
	}
}

function HomeContent() {
	const {AuthState} = useContext(AuthContext)

	// state articles data
	const [articlesData, setArticlesData] = useState([])
	const [articlesRefresh, setArticlesRefresh] = useState(false)

	// event: get articles and refresh
	useEffect(() => {
		getArticles()
		setArticlesRefresh(false)
	}, [articlesRefresh, AuthState])

	// get user token from local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// get all articles
	const getArticles = () => {
		axios({
			method: "get",
			url: `${ApiUrl}/articles`,
			headers: {"Authorization": `Bearer ${token}`},
		}).then((res) => {
			setArticlesData(res.data)
			console.log(res.data)
		})
	}

	return (
		<div className="container">
			<div className="row">
				<div className="d-none d-lg-block col-9">
					<aside className="p-0 d-none d-lg-block mb-4">
						<ProfileBar />
					</aside>
					<aside className="p-0 d-none d-lg-block">
						<Members />
					</aside>
				</div>
				<div className="offset-lg-1 col-lg-26 mb-4">
					<aside className="align-self-center mb-4 ">
						<h1 className="d-none">Page d'accueil Groupomania</h1>
						<ArticleForm setArticlesRefresh={setArticlesRefresh} refresh={false} />
					</aside>
					<main className="d-lg-flex justify-content-lg-between flex-wrap">
						<h3 className="d-none">Post article</h3>
						{articlesData
							.sort(function (a, b) {
								let dateA = new Date(a.createdAt),
									dateB = new Date(b.createdAt)
								return dateB - dateA
							})
							.map((article) => (
								<ArticleCard article={article} key={article.id} setArticlesRefresh={setArticlesRefresh} class="article--card col-lg-17" />
							))}
					</main>
				</div>
			</div>
		</div>
	)
}
