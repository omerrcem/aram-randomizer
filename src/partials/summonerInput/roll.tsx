import Button, { ButtonThemes } from '@/shared/button';
import Icon, { IconSize, IconType } from '@/shared/icon';
import Stepper from '@/shared/stepper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Roll = ({ summoners, setSummoners, options, setOptions }) => {
	const router = useRouter();

	const data = { summoners, options };

	const onSave = () => {
		const stringfied = JSON.stringify(data);
		const encoded = Buffer.from(stringfied).toString('base64');
		localStorage.setItem('summoners', encoded);
		router.push(`/roll?data=${encoded}`);
	};

	const onLoad = () => {
		const encoded = localStorage.getItem('summoners');
		if (!encoded) return;
		const parsed = JSON.parse(Buffer.from(encoded, 'base64').toString());
		setSummoners(parsed?.summoners || []);
		setOptions(parsed?.options || {})
	};

	useEffect(() => {
		onLoad();
	}, []);

	return (
		<div className="w-100-p fs-18 mt-2 d-flex justify-content-center gap-2">
			<Button className="px-3" theme={ButtonThemes.MAGIC} onClick={onSave}>
				<Icon iconType={IconType.DICE} iconSize={IconSize.TINY} />
				Roll
			</Button>
		</div>
	);
};

export default Roll;
