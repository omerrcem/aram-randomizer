import { VERSION, generateSeed } from '@/helper';
import Button, { ButtonThemes } from '@/shared/button';
import Icon, { IconSize, IconType } from '@/shared/icon';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Roll = ({ summoners, setSummoners, options, setOptions }) => {
	const router = useRouter();

	const data = { summoners, options, version: VERSION };

	const onSave = () => {
		const teamSeed = generateSeed();
		const champSeed = generateSeed();
		const stringfied = JSON.stringify(data);
		const encoded = Buffer.from(stringfied).toString('base64');
		localStorage.setItem('data', encoded);
		router.push(`/roll?data=${encoded}&tseed=${teamSeed}&cseed=${champSeed}`);
	};

	const onLoad = () => {
		const encoded = localStorage.getItem('data');
		if (!encoded) return;
		const parsed = JSON.parse(Buffer.from(encoded, 'base64').toString());
		if (VERSION === parsed?.version) {
			setSummoners(parsed?.summoners || []);
			setOptions(parsed?.options || {})
		} else {
			localStorage.getItem('data')
		}
	};

	useEffect(() => {
		onLoad();
	}, []);

	return (
		<div className="w-100-p fs-24 mt-2 d-flex justify-content-center gap-2">
			<Button className="px-3" theme={ButtonThemes.MAGIC} onClick={onSave}>
				<Icon iconType={IconType.DICE} iconSize={IconSize.SMALL} />
				Roll
			</Button>
		</div>
	);
};

export default Roll;
