import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([])
	const navigation = useNavigation()

	useEffect(() => {
		fetch("http://192.168.15.136:3333/games")
			.then(response => response.json())
			.then(data => setGames(data))
	}, [])



	function handleOpenGame ({ bannerUrl, id, title }: GameCardProps) {
		navigation.navigate("game", {
			bannerUrl,
			id,
			title
		})
	}

	return (
		<Background>
		<SafeAreaView style={styles.container}>
			<Image
				source={LogoImg}
				style={styles.logo}
			/>

			<Heading subtitle='Encontre seu Duo!' title='Selecione o game que deseja jogar...' />

			<FlatList
				data={games}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<GameCard
						data={item}
						onPress={() => handleOpenGame(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.contentList}
			/>


		</SafeAreaView>
		</Background>
	);
}
