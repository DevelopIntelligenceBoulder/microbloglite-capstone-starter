import { useEffect, useState } from "react";

const Prompt = (props) => {
	const [message, setMessage] = useState([""]);

	return (
		<form className="card shadow bg-dark-subtle p-0">
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
                            onChange={e=>{setMessage(e.target.value)}}
							value={message}
							placeholder="What is happening near you?"
						></input>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row pb-3 px-3 ">
					<button className="btn btn-primary btn-sm">Post</button>
				</div>
			</div>
		</form>
	);
};


export default Prompt;
