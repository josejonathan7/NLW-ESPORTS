import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { convertHoursToMinutes } from "./utils/convertHoursToMinute";
import { convertMinutesToHours } from "./utils/convertMinutesToHours";

const server = express();
const prisma = new PrismaClient();

server.use(express.json());
server.use(cors());

server.post("/games/:id/ads", async (req: Request, res: Response) => {
	const data: any = req.body;
	const gameId = req.params.id;

	const ad = await prisma.ad.create({
		data: {
			gameId,
			discord: data.discord,
			hourEnd: convertHoursToMinutes(data.hourEnd),
			hourStart: convertHoursToMinutes(data.hourStart),
			name: data.name,
			useVoiceChannel: data.useVoiceChannel,
			weekDays: data.weekDays.join(","),
			yearsPlaying: data.yearsPlaying,

		}
	});


	return res.status(201).json(ad);
});

server.get("/games", async (req: Request, res: Response) => {

	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					Ads: true
				}
			}
		}
	});


	return res.json(games);
});

server.get("/games/:id/ads", async (req: Request, res: Response) => {
	const gamesId = req.params.id;

	const ads = await prisma.ad.findMany({
		where: {
			gameId: gamesId
		},
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourEnd: true,
			hourStart: true
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	return res.json(ads.map(ad => {
		return {
			...ad,
			weekDays: ad.weekDays.split(","),
			hourStart: convertMinutesToHours(ad.hourStart),
			hourEnd: convertMinutesToHours(ad.hourEnd)
		};
	}));
});

server.get("/ads/:id/discord", async (req: Request, res: Response) => {
	const adId = req.params.id;

	const ad = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true
		},
		where: {
			id: adId
		}
	});

	return res.json({discord: ad.discord});
});

server.listen(3333, () => console.log("O servidor esta rodando na porta 3333"));
