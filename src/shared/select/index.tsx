import ReactSelect from 'react-select';
import styles from '../../styles/shared/Select.module.scss';

export enum SelectSizes {
	SMALL,
	MEDIUM,
	LARGE
}

export const SelectSizesValues = {
	[SelectSizes.SMALL]: { height: 35, fontSize: 12 },
	[SelectSizes.MEDIUM]: { height: 60, fontSize: 12 },
	[SelectSizes.LARGE]: { height: 80, fontSize: 12 }
}

const Select = ({ 
	options = [],
	size = SelectSizes.MEDIUM,
	value = null,
	className = '',
	placeholder = '',
	onChange,
}) => {

	const sizeValues = SelectSizesValues[size];

	const getColor = state => {
		if (state.isSelected) return '#F0E6D2';
		if (state.isDisabled) return '#5B5A56';
		return 'unset';
	}

	const customStyles = {
		control: base => ({
		  ...base,
		  minWidth: 80,
		  height: sizeValues.height,
		  minHeight: sizeValues.height,
		}),
		option: (base, state) => ({
			...base,
			color: getColor(state),
			backgroundColor: 'unset',
			':disabled': { backgroundColor: '#5B5A56', color: '#fff' },
			':hover': { backgroundColor: '#5B5A56', color: '#F0E6D2' },
			':focus': { backgroundColor: 'none', color: '#F0E6D2' },
			':active': { backgroundColor: 'none', color: '#F0E6D2' },
		})
	};

	const getValue = () => {
		return (options || []).filter(option => option?.value === value)?.[0] || null;
	}


	return (
		<ReactSelect
			options={options}
			styles={customStyles}
			value={getValue()}
			onChange={onChange}
			isOptionDisabled={(option) => option.disabled}
			placeholder={placeholder}
			className={`${styles.select} ${className}`}
			isSearchable={false}
			components={{
				IndicatorSeparator: () => null
			}}			
			classNames={{
				control: () => `text-start text-primary fs-14 bg-blue-six rounded-0 border-secondary h-100-p ${styles.control}`,
				menu: () => `bg-blue-six my-1 rounded-0 border border-secondary ${styles.menu}`,
				placeholder: () => 'color-grey-two',
				valueContainer: () => 'text-primary',
				singleValue: () => 'text-primary',
				container: () => 'text-secondary',
				input: () => 'text-primary',
		  	}} 
		/>
	)
};

export default Select;
