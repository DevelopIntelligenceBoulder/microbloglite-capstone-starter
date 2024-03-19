import { useState } from "react";
import * as utils from "../utils/auth.js";

const { token, username } = await utils.getLocalUserData();

const Prompt = (props) => {
	const [message, setMessage] = useState([""]);

	function handlePost(message) {
		console.log(token);

		const options = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text: message })
		};
		fetch(utils.API_URL + "/api/posts", options).then((res) => {
			console.log(res);
			if (res.ok) window.location.reload();
			else setMessage("");
		});
	}
	return (
		<article className="card shadow bg-dark-subtle p-0">
			<div className="card-body px-4">
				<div className="row">
					<div className="col-auto py-4">
						<div
							className="bi bi-person-fill bg-secondary p-1 "
							style={{
								fontSize: "xx-large"
							}}
						></div>
					</div>
					<div className="col align-self-center">
						<input
							type="text"
							className=" form-control-plaintext"
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							value={message}
							placeholder={`What is happening near you?`}
						></input>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row pb-3 px-4">
					<button
						type="submit"
						onClick={() => {
							handlePost(message);
							setMessage("");
						}}
						className="btn btn-primary btn-sm"
					>
						Post
					</button>
				</div>
			</div>
		</article>
	);
};

export default Prompt;
