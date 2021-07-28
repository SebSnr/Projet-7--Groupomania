import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import { useHistory } from "react-router"
// components
import {AuthContext} from "../App"

export default function Navigation() {
	// dispatch action and state of authentication
	const {dispatchAuthState} = useContext(AuthContext)

	// use history hook
	const history = useHistory()

	const handleDeconnect = () => {
		dispatchAuthState({
			type: "LOGOUT",
		})
		history.push("/")
	}

	return (
		<header className="header shadow py-0">
			<nav className="navbar navbar-expand-lg mb-4">
				<div className="container">
					<NavLink className="navbar-brand d-none d-lg-block" to="/">
						<img src="/img/icon.png" alt="Retour accueil" className="navbar-brand__logo" />
					</NavLink>
					<button className="nav-btn-icon d-lg-none my-2" onClick={() => history.goBack()} title="revenir en arrière">
						<img src="/img/previous-icon.svg" alt="Precedent" className="nav-svg-icon" />
					</button>
					<button
						className="navbar-toggler nav-burger--custom"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
						title="Toggle navigation"
					>
						☰ MENU
					</button>
					<div className="collapse navbar-collapse flex-grow-0" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item d-lg-none">
								<NavLink className="nav-link nav-link--custom " to="/">
									Accueil
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-link--custom d-lg-none" to="/members">
									Membres
								</NavLink>
							</li>
							<li className="nav-item d-lg-none">
								<NavLink className="nav-link nav-link--custom" to="/profile">
									Profil
								</NavLink>
							</li>
							<li className="nav-item">
								<button
									onClick={() => {
										if (window.confirm("Se déconnecter ?")) handleDeconnect()
									}}
									className="nav-btn-icon"
									title="Se deconnecter"
								>
									<img src="/img/logout.svg" className="nav-svg-icon my-2" alt="Se deconnecter"></img>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}
