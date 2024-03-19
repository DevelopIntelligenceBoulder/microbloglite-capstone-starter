import * as auth from "../utils/auth.js";
import { useState, useEffect } from "react";
import Post from "./Post.jsx";
import LoadingFeedTemplate from "./LoadingFeedTemplate.jsx";
import Prompt from "./Prompt.jsx";

const loginData = auth.getLocalUserData();
const options = {
	method: "GET",
	headers: {
		Authorization: `Bearer ${loginData.token}`
	}
};

function Feed() {
	const [posts, setPosts] = useState([<LoadingFeedTemplate amount={10} />]);

	useEffect(() => {
		//Make a fetch request
		fetch(auth.API_URL + "/api/posts", options)
			.then((response) => response.json())
			.then((posts) => {
				setPosts(posts.map((post) => <Post key={post.id} postData={post} />));
			});
	}, []);

	return (
		<section className="container-fluid mb-4">
			<div className="row gap-2 m-0">
				<article
					className="card col-md-2 col-12 shadow"
					style={{ minHeight: 100 + "px", minWidth: 10 + "rem" }}
				></article>
				<div className="col-sm col-12">
					<div className="row gap-2">
						<Prompt></Prompt>
						{posts}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Feed;
