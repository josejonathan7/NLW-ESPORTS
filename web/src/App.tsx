import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles/main.css";
import LogoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";
import { CreatedAdModal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		Ads: number;
	}
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		axios.get("http://localhost:3333/games")
			.then(response => {
				setGames(response.data);
			});
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={LogoImg} alt="" />

			<h1 className="text-6xl text-white font-black mt-20">
				Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> esta aqui.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">

				{
					games.map(game => {

						return (
							<GameBanner
								bannerUrl={game.bannerUrl}
								adsCounter={game._count.Ads}
								title={game.title}
								key={game.id}
							/>
						);
					})
				}

			</div>

			<Dialog.Root>
				<CreateAdBanner />

				<CreatedAdModal />

			</Dialog.Root>

		</div>
	);
}

export default App;
