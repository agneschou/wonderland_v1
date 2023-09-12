import GameEventForm from '@/components/form/GameEventForm';
import { getI18n } from '@/i18n';
import { addAllOption } from '@/lib/helper';
import { getCountryList, getGameCodeList } from '@/lib/serverAction';
import { IOption } from '@/model/IOption';
import Loading from '../loading';

export interface CountryList {
	languageCode: string;
	language: string;
	countryName: string;
	isoCode: string;
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
	const dict = await getI18n(lang);

	const countries = await getCountryList();
	console.log('countries', countries);

	if (!countries) return <Loading />;

	const gameLists = await getGameCodeList();
	console.log('gameLists', gameLists);
	if (!gameLists) return <Loading />;

	const countryList: IOption[] = addAllOption(
		countries.map(({ isoCode, countryName }) => ({
			value: isoCode,
			label: countryName,
		}))
	);

	const gameCodeList: IOption[] = addAllOption(
		gameLists.map(({ gameCode, gameName }) => ({
			value: gameCode,
			label: gameName,
		}))
	);
	return <GameEventForm dict={dict} countryList={countryList} gameCodeList={gameCodeList} />;
}
