import React, {useState} from "react"
import SignUpForm from "./SignUpForm"
import LoginForm from "./LoginForm"

export default function Connexion() {
	const [connexionContent, setConnexionContent] = useState()

	return (
		<div>
			{(() => {
				switch (connexionContent) {
					case "signUp":
						return (
							<div className="connexionContent">
								<SignUpForm />
								<br />
								Déjà un compte ?
								<br />
								<br />
								<button className="btn btn-customize1" onClick={() => setConnexionContent("login")}  title="Se connecter"  aria-label="Se connecter">
									Se connecter
								</button>
							</div>
						)
					case "login":
						return (
							<div className="connexionContent">
								<LoginForm />
								<br />
								Créer un compte
								<br />
								<br />
								<button className="btn btn-customize1" onClick={() => setConnexionContent("signUp")}  title="S'inscrire"  aria-label="S'inscrire">
									S'inscrire
								</button>
							</div>
						)
					default:
						return (
							<div className="connexionContent">
								<button type="button" onClick={() => setConnexionContent("signUp")} className="btn-lg btn-primary" title="S'inscrire" aria-label="S'inscrire">S'inscrire</button>
								<br></br>
								ou
								<br></br>
								<br></br>
								<button type="button" onClick={() => setConnexionContent("login")} className="btn-lg btn-primary"  title="Se connecter" aria-label="Se connecter">Se connecter</button>
							</div>
						)
				}
			})()}
		</div>
	)
}
