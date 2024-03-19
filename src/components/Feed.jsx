import * as auth from "../utils/auth.js";
import { useState, useEffect, StrictMode } from "react";
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

function Feed({ users = "all", limit = 10 }) {
	const [posts, setPosts] = useState([<LoadingFeedTemplate amount={10} />]);

	users = users == "all" ? "" : loginData.username;

	const queryParams = new URLSearchParams();
	queryParams.append("username", users);
	queryParams.append("limit", limit);
	const query = "?" + queryParams;

	useEffect(() => {
		//Make a fetch request
		fetch(auth.API_URL + `/api/posts/${query}`, options)
			.then((response) => response.json())
			.then((posts) => {
				setPosts(
					posts.map((post) => (
						<Post
							key={post._id}
							postData={post}
							deletable={users == loginData.username ? true : false}
							users={users ? users : null}
						/>
					))
				);
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
