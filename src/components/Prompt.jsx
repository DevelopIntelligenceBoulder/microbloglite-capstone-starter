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
			<div className="card-body container m-0 p-0 py-3">
				<div className="row mx-3 py-3">
					<div className="col-auto ">
						<div
							className="bi bi-person-fill border border-1 shadow-lg bg-dark p-2"
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

			<div className="container card-footer ">
				<div className="row px-1 py-0">
					<button
						type="submit"
						onClick={() => {
							handlePost(message);
							setMessage("");
						}}
						className="btn btn-primary"
					>
						Post
					</button>
				</div>
			</div>
		</article>
	);
};

export default Prompt;
