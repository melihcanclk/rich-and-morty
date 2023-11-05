import styles from "@/components/Dropdown/Dropdown.module.scss";

interface Props {
	title: string;
	options: string[];
	setValue: (value: string) => void;
	value: string;
	multiSelect?: boolean;
}

const Dropdown = ({ title = "", options = [], setValue, value }: Props) => {
	return (
		<div >
			<label htmlFor={title} className={styles.label}>
				{title}
			</label>
			<div className={styles.dropdown}>
				<select
					className={styles.dropdown__select}
					id={title}
					onChange={(e) => setValue(e.target.value.toLowerCase())}
					title={title}
					value={value}
				>
					{<option value="">{"Not Selected"}</option>}
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>

	);
};

export default Dropdown;