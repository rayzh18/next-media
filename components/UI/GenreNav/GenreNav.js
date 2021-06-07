import { useStateContext } from '../../HBOProvider'
import Link from 'next/link'
import { useState } from 'react';

const GenreNav = (props) => {
	// const globalState = useStateContext();
	const [activeNav, setActiveNav] = useState(false)
	setTimeout(() => setActiveNav(true), 100)
	console.log("genrelist", props)

	return (
		<ul className={`genre-nav ${activeNav ? 'genre-nav--active' : ''}`}>
				<GenreList genresData={props.genresData} mediaType={props.mediaType}/>
			
		</ul>
	);
};
const GenreList = (props) => {
	return props.genresData.map((item) => {
		return(
			<li key={item.id}>
			<a href={`/${props.mediaType}/genre/${item.id}`}>
			<span>
				{item.name}
			</span>
			</a>
		</li>
		)
	})
}

export default GenreNav;
