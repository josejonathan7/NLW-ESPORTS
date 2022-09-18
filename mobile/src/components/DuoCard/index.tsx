import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native'
import { styles } from './styles';


export interface DuoCardProps {
	hourdEnd: string;
	hourStart: string;
	id: string;
	name: string;
	useVoiceChannel: boolean;
	weekDays: string[],
	yearsPlaying: number;
}

interface Props {
	data: DuoCardProps;
	onConnect: () => void;
}

export function DuoCard({ data, onConnect: onConect }: Props ) {
  return (
	<View style={styles.container}>
		<DuoInfo
			label='Nome'
			value={data.name}
		/>

		<DuoInfo
			label='Tempo de jogo'
			value={`${data.yearsPlaying} anos`}
		/>

		<DuoInfo
			label='Disponibilidade'
			value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourdEnd}`}
		/>

		<DuoInfo
			label='Chamada de audio?'
			value={data.useVoiceChannel ? "Sim" : "Não"}
			colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
		/>

		<TouchableOpacity
			style={styles.button}
			onPress={onConect}
		>
			<GameController
				size={20}
				color={THEME.COLORS.TEXT}
			/>
			<Text style={styles.buttonTitle}>
				Conectar
			</Text>
		</TouchableOpacity>
	</View>
  );
}
