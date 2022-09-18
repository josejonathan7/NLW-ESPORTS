import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CaretDown, Check, GameController } from "phosphor-react";
import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "./Form/Input";
import axios from "axios";

interface Game {
	id: string;
	title: string;
}

export function CreatedAdModal() {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState(false);
	const [selectGame, setSelectGame] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3333/games")
			.then(response => {
				setGames(response.data);
			});
	}, []);

	async function handleCreatedAt (event: FormEvent) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		if(!data.name) {
			return alert("Campo ");
		}

		try {
			await axios.post(`http://localhost:3333/games/${selectGame}/ads`, {
				...data,
				yearsPlaying: Number(data.yearsPlaying),
				weekDays: weekDays.map(Number),
				useVoiceChannel
			});

			alert("Anúncio criado com sucesso");
		} catch (error) {
			console.log(error);
			alert("Erro ao criar anuncio");
		}


	}

	return (

		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/80 inset-0 fixed" />

			<Dialog.Content className="fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
				<Dialog.Title className="text-3xl font-black" >Publique um anúncio!</Dialog.Title>

				<form onSubmit={handleCreatedAt} className="mt-8 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">Qual o Game?</label>
						<Select.Root onValueChange={setSelectGame} value={selectGame}>
							<Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex items-center justify-between">
								<Select.Value placeholder="Selecione o game que deseja jogar" className="text-zinc-500" />
								<Select.Icon>
									<CaretDown className="bg-zinc-900 w-6 h-6" />
								</Select.Icon>
							</Select.Trigger>
							<Select.Portal>
								<Select.Content className="bg-zinc-900 mt-1 text-white p-4 rounded">
									<Select.Viewport>
										<Select.Group>

											<Select.Item disabled={true} value="">
												<Select.ItemText >Selecione o game que deseja jogar</Select.ItemText>
											</Select.Item>

											{
												games.map(item => {
													return (
														<Select.Item value={item.id} key={item.id}>
															<Select.ItemText >{item.title}</Select.ItemText>
														</Select.Item>
													);
												})
											}
										</Select.Group>
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>


					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input id="name" name="name" placeholder="Como te chamam dentro d ogame?" />
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Joga a quantos anos?</label>
							<Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder="tudo bem ser ZERO"  />
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual seu discord?</label>
							<Input id="discord" name="discord" placeholder="Usuario#000" />
						</div>
					</div>

					<div className="flex gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="weekDays">Quando costuma jogar?</label>

							<ToggleGroup.Root
								type="multiple"
								className="grid grid-cols-4 gap-1"
								value={weekDays}
								onValueChange={setWeekDays}
							>
								<ToggleGroup.Item value="0" className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900" }`} title="domingo">D</ToggleGroup.Item>
								<ToggleGroup.Item value="1" className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900" }`} title="segunda">S</ToggleGroup.Item>
								<ToggleGroup.Item value="2" className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900" }`} title="terça">T</ToggleGroup.Item>
								<ToggleGroup.Item value="3" className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900" }`} title="quarta">Q</ToggleGroup.Item>
								<ToggleGroup.Item value="4" className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900" }`} title="quinta">Q</ToggleGroup.Item>
								<ToggleGroup.Item value="5" className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900" }`} title="sexta">S</ToggleGroup.Item>
								<ToggleGroup.Item value="6" className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900" }`} title="sabado">S</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>

						<div className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart">Qual horário do dia?</label>

							<div className="grid grid-cols-2 gap-2">
								<Input type="time" name="hourStart" id="hourStart" placeholder="De" />
								<Input type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
							</div>
						</div>
					</div>

					<label className="mt-2 flex gap-2 text-sm">
						<Checkbox.Root
							onCheckedChange={(checked) => checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}
							checked={useVoiceChannel}
							className="w-6 h-6 p-1 roundend bg-zinc-900"
						>
							<Checkbox.Indicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</Checkbox.Indicator>
						</Checkbox.Root>
						Costumo me conectar ao chat de voz
					</label>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close
							className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
						>
							Cancelar
						</Dialog.Close>

						<button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
							<GameController size={24} />
							Encontrar Duo
						</button>
					</footer>

				</form>

			</Dialog.Content>
		</Dialog.Portal>
	);
}
