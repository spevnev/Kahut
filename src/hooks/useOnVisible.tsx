import React, {useEffect, useRef} from "react";

const isVisible = (el: HTMLElement | undefined, positionCoefficient: number = 1): boolean => el ? el.offsetTop < window.innerHeight * positionCoefficient + window.scrollY : false;

type Props = {
	positionCoefficient?: number,
	callback: () => any
}

const useOnVisible = ({positionCoefficient, callback}: Props) => {
	const ref = useRef();

	const _callback = () => {
		if (!isVisible(ref.current, positionCoefficient)) return;

		window.removeEventListener("scroll", _callback);
		window.removeEventListener("resize", _callback);
		callback();
	};

	useEffect(() => {
		window.addEventListener("scroll", _callback);
		window.addEventListener("resize", _callback);

		return () => {
			window.removeEventListener("scroll", _callback);
			window.removeEventListener("resize", _callback);
		};
	}, [_callback]);

	return ref;
};

export default useOnVisible;