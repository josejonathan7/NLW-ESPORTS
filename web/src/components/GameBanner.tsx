import React from "react";

interface GameBannerProps {
	bannerUrl: string;
	title: string;
	adsCounter: number;
}

export function GameBanner({ bannerUrl, title, adsCounter}: GameBannerProps) {

	return (
		<a href="" className="relative rounded-lg" >
			<img src={bannerUrl} alt="" />

			<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
				<strong className="font-bold text-white block">{title}</strong>
				<span className="text-zinc-300 text-sm block">{adsCounter} anuncio(s)</span>
			</div>
		</a>
	);
}
