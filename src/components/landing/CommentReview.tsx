import React from "react";
import {StaticImageData} from "next/image";

type Props = {
	user: {
		name: string,
		image: StaticImageData
	},
	children: string
}

const CommentReview = ({user: {name, image}, children}: Props) => {
	return (
		<div>
			{children}
		</div>
	);
};

export default CommentReview;