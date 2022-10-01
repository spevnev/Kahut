import React from "react";
import {StaticImageData} from "next/image";

type Props = {
	title: string,
	icon: StaticImageData,
	children: string
}

const TextItem = ({title, icon, children}: Props) => {
	return (
		<div>
			{children}
		</div>
	);
};

export default TextItem;